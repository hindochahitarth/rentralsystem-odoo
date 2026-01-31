const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
    try {
        const userId = req.user.id; // From authMiddleware
        const { items, total } = req.body; // Items passed from frontend (cartItems)

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
                    status: 'PAID',
                    items: {
                        create: items.map(item => ({
                            productId: item.productId || item.id, // Handle if frontend sends 'id' as productId
                            quantity: item.quantity,
                            price: item.price
                        }))
                    }
                },
                include: {
                    items: {
                        include: { product: true }
                    }
                }
            });

            // 2. Clear the User's Cart
            await prisma.cart.delete({
                where: { userId }
            }).catch(() => { }); // Ignore if cart doesn't exist

            return newOrder;
        });

        res.status(201).json({
            success: true,
            data: order,
            message: 'Order created successfully'
        });

    } catch (error) {
        console.error('Create Order Error:', error);
        console.error('Request Body:', JSON.stringify(req.body, null, 2)); // Log payload
        res.status(500).json({
            success: false,
            message: 'Failed to create order',
            error: error.message,
            stack: error.stack // Optional: remove in production
        });
    }
};

const getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await prisma.order.findUnique({
            where: { id }, // This creates a slight issue if we want to search by orderNumber too
            include: { items: { include: { product: true } } }
        });

        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch order' });
    }
}

module.exports = { createOrder, getOrder };
