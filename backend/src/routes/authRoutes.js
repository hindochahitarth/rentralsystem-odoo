const express = require('express');
const router = express.Router();
const { register, login, getMe, forgotPassword } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/signup', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

router.get('/me', protect, getMe);

module.exports = router;
