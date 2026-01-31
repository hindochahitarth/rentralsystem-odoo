const authService = require('../services/authService');

const register = async (req, res) => {
    try {
        const result = await authService.signup(req.body);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: result,
        });
    } catch (error) {
        if (error.message?.includes('JWT_SECRET')) {
            return res.status(500).json({ success: false, message: 'Server configuration error' });
        }
        const msg = error?.message || 'Registration failed';
        const status = error?.code === 'P2023' || msg.includes('exist') ? 500 : 400;
        const message = msg.includes('connect') || error?.code === 'P1001'
            ? 'Database is not available. Run migrations and check DATABASE_URL.'
            : msg;
        return res.status(status).json({ success: false, message });
    }
};

const login = async (req, res) => {
    try {
        const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';
        const password = req.body?.password;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }
        const result = await authService.login(email, password);
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: result,
        });
    } catch (error) {
        if (error.message?.includes('JWT_SECRET')) {
            return res.status(500).json({ success: false, message: 'Server configuration error' });
        }
        const msg = error?.message || 'Login failed';
        const status = error?.code === 'P2023' || msg.includes('exist') ? 500 : 400;
        const message = msg.includes('connect') || error?.code === 'P1001'
            ? 'Database is not available. Run migrations and check DATABASE_URL.'
            : msg;
        return res.status(status).json({ success: false, message });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await authService.getMe(req.user.userId);
        res.status(200).json({
            success: true,
            data: { user },
        });
    } catch (error) {
        const msg = error?.message || 'Failed to get user';
        const status = msg === 'User not found' ? 404 : 500;
        return res.status(status).json({ success: false, message: msg });
    }
};

const forgotPassword = async (req, res) => {
    // Mock forgot password flow as requested
    res.status(200).json({
        success: true,
        message: 'The password reset link has been sent to your email.',
    });
};

module.exports = {
    register,
    login,
    getMe,
    forgotPassword,
};
