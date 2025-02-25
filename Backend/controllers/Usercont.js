import User from '../models/User.js';
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Sign up a new user
export const signUp = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if user with the same email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if the user should be an admin
        if (email === 'Hassgass@gmail.com' && password === 'HassGassAdmin2025') {
            const newAdmin = new Admin({
                username,
                email,
                password: hashedPassword,
                role: 'admin'
            });

            await newAdmin.save();
            return res.status(201).json({ message: 'Admin registered successfully', user: newAdmin });
        }

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'customer'
        });

        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Login a user
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

//   logout user
export const logout = async (req, res) => {
    try {
        return res.status(200).json({ message: 'Logout successful', token: null });
    } catch (error) {
        console.error('Error logging out user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a user by ID
export const updateUser = async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findById(req.params.id);
        const admin = await Admin.findById(req.params.id);

        if (!user && !admin) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user) {
            // If the user is currently a customer and is being updated to admin
            if (role === 'admin') {
                const newAdmin = new Admin({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    role: 'admin'
                });

                await newAdmin.save();
                await User.findByIdAndDelete(user._id);
                return res.status(200).json({ message: 'User updated to admin successfully', user: newAdmin });
            } else {
                // Update the user as a customer
                const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
                return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
            }
        }

        if (admin) {
            // If the user is currently an admin and is being updated to customer
            if (role === 'customer') {
                const newUser = new User({
                    _id: admin._id,
                    username: admin.username,
                    email: admin.email,
                    password: admin.password,
                    role: 'customer'
                });

                await newUser.save();
                await Admin.findByIdAndDelete(admin._id);
                return res.status(200).json({ message: 'Admin updated to customer successfully', user: newUser });
            } else {
                // Update the user as an admin
                const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
                return res.status(200).json({ message: 'Admin updated successfully', user: updatedAdmin });
            }
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};