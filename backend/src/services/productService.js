const prisma = require('../config/db');
const { Prisma } = require('@prisma/client');

/**
 * List products with optional filters. All data from DB.
 */
async function listProducts(filters = {}) {
    const { brand, color, durationType, minPrice, maxPrice } = filters;
    const where = {};

    if (brand && String(brand).trim()) {
        where.brand = { equals: String(brand).trim(), mode: 'insensitive' };
    }
    if (color && String(color).trim()) {
        where.color = { equals: String(color).trim(), mode: 'insensitive' };
    }
    if (durationType && String(durationType).trim()) {
        const dur = String(durationType).trim().toUpperCase();
        if (['HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR'].includes(dur)) {
            where.durationType = dur;
        }
    }
    if (minPrice != null && minPrice !== '') {
        const num = parseFloat(minPrice);
        if (!isNaN(num)) where.price = { ...where.price, gte: Prisma.Decimal(num) };
    }
    if (maxPrice != null && maxPrice !== '') {
        const num = parseFloat(maxPrice);
        if (!isNaN(num)) {
            where.price = where.price && typeof where.price === 'object'
                ? { ...where.price, lte: Prisma.Decimal(num) }
                : { lte: Prisma.Decimal(num) };
        }
    }

    const products = await prisma.product.findMany({
        where,
        include: { variants: true },
        orderBy: { createdAt: 'desc' },
    });

    return products.map((p) => ({
        id: p.id,
        name: p.name,
        category: p.category,
        brand: p.brand,
        color: p.color,
        description: p.description,
        price: Number(p.price),
        durationType: p.durationType,
        stock: p.stock,
        imageUrl: p.imageUrl,
        createdAt: p.createdAt,
        variants: p.variants.map((v) => ({ id: v.id, optionName: v.optionName, optionValue: v.optionValue })),
    }));
}

/**
 * Get product by id with variants. Returns null if not found.
 */
async function getProductById(id) {
    if (!id) return null;
    const product = await prisma.product.findUnique({
        where: { id },
        include: { variants: true },
    });
    if (!product) return null;
    return {
        id: product.id,
        name: product.name,
        category: product.category,
        brand: product.brand,
        color: product.color,
        description: product.description,
        price: Number(product.price),
        durationType: product.durationType,
        stock: product.stock,
        imageUrl: product.imageUrl,
        createdAt: product.createdAt,
        variants: product.variants.map((v) => ({ id: v.id, optionName: v.optionName, optionValue: v.optionValue })),
    };
}

module.exports = {
    listProducts,
    getProductById,
};
