import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Assuming you have a User model

export const isAdmin = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifying admin:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};