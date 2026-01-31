const prisma = require('../config/db');
const { hashPassword, comparePassword, generateToken } = require('../utils/auth');

const signup = async (userData) => {
    const { name, email, companyName, gstin, password, role, vendorCategory } = userData;
    const normalizedEmail = String(email || '').trim().toLowerCase();
    if (!normalizedEmail) throw new Error('Email is required');
    if (!password || typeof password !== 'string' || password.trim() === '') {
        throw new Error('Password is required');
    }

    const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existingUser) {
        throw new Error('User already exists with this email');
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            name: name?.trim() || '',
            email: normalizedEmail,
            companyName,
            gstin,
            password: hashedPassword,
            role: role || 'CUSTOMER',
            vendorCategory: role === 'VENDOR' ? vendorCategory : null,
        },
    });

    const token = generateToken(user.id, user.role);

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
};

const login = async (email, password) => {
    const normalizedEmail = String(email || '').trim().toLowerCase();
    if (!normalizedEmail || !password) throw new Error('Invalid email or password');
    const user = await prisma.user.findFirst({
        where: { email: { equals: normalizedEmail, mode: 'insensitive' } },
    });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    const token = generateToken(user.id, user.role);

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
};

/**
 * Get user by ID for protected routes. Never returns password.
 */
const getMe = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) {
        throw new Error('User not found');
    }
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

module.exports = {
    signup,
    login,
    getMe,
};
