const productService = require('../services/productService');

const listProducts = async (req, res) => {
    try {
        const { brand, color, durationType, minPrice, maxPrice } = req.query;
        const products = await productService.listProducts({
            brand,
            color,
            durationType,
            minPrice,
            maxPrice,
        });
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Failed to list products' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message || 'Failed to get product' });
    }
};

module.exports = {
    listProducts,
    getProductById,
};
