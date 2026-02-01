const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
    try {
        let userId = req.user.userId; // Default to logged-in user

        // Allow Vendors/Admins to create orders for other users
        if ((req.user.role === 'VENDOR' || req.user.role === 'ADMIN') && req.body.customerId) {
            userId = req.body.customerId;
        }
        // Extract all new fields
        const { items, total, untaxedAmount, taxAmount, discountAmount, shippingCost, note } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: 'No items in order' });
        }

        // Generate a simple Order Number
        const orderNumber = `SO${Date.now().toString().slice(-6)}`;

        // Create Order transaction
        const order = await prisma.$transaction(async (prisma) => {
            // 1. Create the Order
            const newOrder = await prisma.order.create({
                data: {
                    userId,
                    orderNumber,
                    totalAmount: total,
                    untaxedAmount: untaxedAmount || 0,
                    taxAmount: taxAmount || 0,
                    discountAmount: discountAmount || 0,
                    shippingCost: shippingCost || 0,
                    note: note || null,
                    status: 'QUOTATION',
                    items: {
                        create: items.map(item => ({
                            productId: item.productId || item.id,
                            quantity: Number(item.quantity) || 1,
                            price: item.price, // Prisma handles string/number to Decimal
                            startDate: item.startDate ? new Date(item.startDate) : null,
                            endDate: item.endDate ? new Date(item.endDate) : null
                        }))
                    }
                },
                include: {
                    items: {
                        include: { product: true }
                    }
                }
            });

            console.log('Order created successfully in transaction:', newOrder.id);

            // 2. Clear the User's Cart if it exists (only if userId matches logged in user, optional behavior)
            // For vendor creating for others, we probably shouldn't clear the customer's cart
            if (userId === req.user.userId) {
                await prisma.cart.delete({
                    where: { userId }
                }).catch(() => { });
            }

            return newOrder;
        });

        res.status(201).json({
            success: true,
            data: order,
            message: 'Order created successfully'
        });

    } catch (error) {
        console.error('Create Order Error:', error);
        console.error('Request Body:', JSON.stringify(req.body, null, 2));
        res.status(500).json({
            success: false,
            message: 'Failed to create order',
            error: error.message,
            stack: error.stack
        });
    }
};


const { Parser } = require('json2csv');

const getOrders = async (req, res) => {
    try {
        const userId = req.user.userId;
        const role = req.user.role;

        let queryOptions = {
            include: {
                items: { include: { product: true } },
                user: { select: { name: true, email: true } } // Include customer details for vendors
            },
            orderBy: { createdAt: 'desc' }
        };

        // Customers see only their own orders. Vendors/Admins see all.
        if (role !== 'VENDOR' && role !== 'ADMIN') {
            queryOptions.where = { userId };
        }

        const orders = await prisma.order.findMany(queryOptions);
        res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error) {
        console.error("Get Orders Error", error);
        res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
};

const getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;
        const order = await prisma.order.findUnique({
            where: { id },
            include: { items: { include: { product: true } } }
        });

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // Authorization check: ensure order belongs to user
        if (order.userId !== userId && req.user.role !== 'ADMIN') {
            return res.status(403).json({ success: false, message: 'Not authorized to view this order' });
        }

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.error("Get Order Error", error);
        res.status(500).json({ success: false, message: 'Failed to fetch order' });
    }
};

const exportOrders = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orders = await prisma.order.findMany({
            where: { userId },
            include: {
                user: true,
                items: {
                    include: { product: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        if (orders.length === 0) {
            return res.status(404).json({ success: false, message: 'No orders found to export' });
        }

        // Flatten data for CSV
        const simplifiedOrders = orders.map(order => {
            // Join all items into a string for the CSV cell
            const itemNames = order.items.map(i => `${i.product.name} (x${i.quantity})`).join('; ');
            return {
                OrderNumber: order.orderNumber,
                Date: order.createdAt.toISOString().split('T')[0],
                Customer: order.user ? order.user.name : 'Unknown',
                Items: itemNames,
                TotalAmount: order.totalAmount,
                Status: order.status
            };
        });

        const fields = ['OrderNumber', 'Date', 'Customer', 'Items', 'TotalAmount', 'Status'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(simplifiedOrders);

        res.header('Content-Type', 'text/csv');
        res.header('Content-Disposition', `attachment; filename=orders_export_${Date.now()}.csv`);
        res.status(200).send(csv);

    } catch (error) {
        console.error('Export Error:', error);
        res.status(500).json({ success: false, message: 'Export failed' });
    }
};

const confirmOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        // 1. Get the order with items
        const order = await prisma.order.findUnique({
            where: { id },
            include: { items: { include: { product: true } } }
        });

        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

        // Only allow confirming Quotations
        if (order.status !== 'QUOTATION' && order.status !== 'QUOTATION_SENT') {
            return res.status(400).json({ success: false, message: 'Only quotations can be confirmed' });
        }

        // 2. Validate Stock for each item
        for (const item of order.items) {
            if (!item.startDate || !item.endDate) continue; // Skip non-rental items if any

            // Check total reserved quantity for this product in the overlapping period
            // Overlap formula: (StartA <= EndB) and (EndA >= StartB)
            const overlappingItems = await prisma.orderItem.findMany({
                where: {
                    productId: item.productId,
                    order: {
                        status: { in: ['SALES_ORDER', 'CONFIRMED', 'PAID'] }, // Only count confirmed bookings
                        id: { not: id } // Exclude current order
                    },
                    AND: [
                        { startDate: { lte: item.endDate } },
                        { endDate: { gte: item.startDate } }
                    ]
                }
            });

            const reservedQuantity = overlappingItems.reduce((sum, i) => sum + i.quantity, 0);

            if (reservedQuantity + item.quantity > item.product.stock) {
                return res.status(400).json({
                    success: false,
                    message: `Product ${item.product.name} is out of stock for the selected dates. Available: ${item.product.stock - reservedQuantity}, Requested: ${item.quantity}`
                });
            }
        }

        // 3. Update Status
        const updatedOrder = await prisma.order.update({
            where: { id },
            data: { status: 'SALES_ORDER' }
        });

        res.status(200).json({ success: true, message: 'Order confirmed successfully', data: updatedOrder });

    } catch (error) {
        console.error('Confirm Order Error:', error);
        res.status(500).json({ success: false, message: 'Failed to confirm order' });
    }
};

const payOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { method } = req.body; // e.g. 'CREDIT_CARD', 'UPI'

        // Mock Payment Processing
        // In real app: verify Stripe/PaymentGateway transaction here.

        const order = await prisma.order.findUnique({ where: { id } });
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

        if (order.status !== 'SALES_ORDER' && order.status !== 'CONFIRMED') {
            return res.status(400).json({ success: false, message: 'Only confirmed orders can be paid.' });
        }

        // Transaction: Update Order -> Create Invoice
        const result = await prisma.$transaction(async (prisma) => {
            const updatedOrder = await prisma.order.update({
                where: { id },
                data: { status: 'PAID' }
            });

            const invoice = await prisma.invoice.create({
                data: {
                    orderId: id,
                    amount: order.totalAmount,
                    status: 'PAID',
                    paymentDate: new Date(),
                    method: method || 'ONLINE'
                }
            });

            return { order: updatedOrder, invoice };
        });

        res.status(200).json({
            success: true,
            message: 'Payment successful. Order Paid.',
            data: result.order,
            invoiceId: result.invoice.id
        });
    } catch (error) {
        console.error('Payment Error:', error);
        res.status(500).json({ success: false, message: 'Payment failed' });
    }
};

module.exports = { createOrder, getOrder, getOrders, exportOrders, confirmOrder, payOrder };
