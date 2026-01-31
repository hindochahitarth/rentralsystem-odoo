const express = require('express');
const { createOrder, getOrder } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/:id', protect, getOrder);

module.exports = router;
