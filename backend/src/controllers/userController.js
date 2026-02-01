const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get user profile
const getProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                companyName: true,
                gstin: true,
                address: true,
                phone: true,
                profileImage: true,
                vendorCategory: true
            }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update user profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, phone, companyName, gstin, address } = req.body;

        // Handle file upload if present (assuming req.file is populated by multer)
        let profileImage = undefined;
        if (req.file) {
            // For now, storing local path or base64. 
            // In a real app we'd upload to S3/Cloudinary. 
            // Let's assume we serve 'uploads' statically.
            profileImage = `/uploads/${req.file.filename}`;
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                name,
                phone,
                companyName,
                gstin,
                address,
                ...(profileImage && { profileImage })
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                companyName: true,
                gstin: true,
                address: true,
                phone: true,
                profileImage: true,
            }
        });

        res.status(200).json({ success: true, count: 1, data: updatedUser });
    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({ success: false, message: 'Failed to update profile' });
    }
};

const getCustomers = async (req, res) => {
    try {
        const customers = await prisma.user.findMany({
            where: { role: 'CUSTOMER' },
            select: { id: true, name: true, email: true, companyName: true }
        });
        res.status(200).json({ success: true, count: customers.length, data: customers });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to fetch customers' });
    }
};

// Update password
const updatePassword = async (req, res) => {
    try {
        console.log("Update Password Request Received");
        const userId = req.user.userId;
        const { currentPassword, newPassword } = req.body;

        console.log(`User ID: ${userId}, NewPasswordProvided: ${!!newPassword}`);

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ success: false, message: 'Please provide current and new password' });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            console.log("User not found via ID");
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Verify current password
        const bcrypt = require('bcryptjs');
        const isMatch = await bcrypt.compare(currentPassword, user.password);

        console.log(`Password Match Status: ${isMatch}`);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Incorrect current password' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword }
        });

        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error('Update Password Error:', error);
        res.status(500).json({ success: false, message: 'Failed to update password' });
    }
};

module.exports = {
    getProfile,
    updateProfile,
    getCustomers,
    updatePassword
};
