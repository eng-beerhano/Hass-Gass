import SubAdmin from '../models/SubAdmin.js';
import Branch from '../models/Branch.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new SubAdmin
export const registerSubAdmin = async (req, res) => {
    const { name, email, password, branch } = req.body;

    try {
        // Check if sub-admin with the same email already exists
        const subAdminExists = await SubAdmin.findOne({ email });
        if (subAdminExists) {
            return res.status(400).json({ message: 'Sub-admin already exists' });
        }

        // Check if branch exists
        const branchExists = await Branch.findOne({ name: branch });
        if (!branchExists) {
            return res.status(400).json({ message: 'Branch does not exist' });
        }

        // Check if a sub-admin is already registered for the branch
        const subAdminForBranchExists = await SubAdmin.findOne({ branch });
        if (subAdminForBranchExists) {
            return res.status(400).json({ message: 'A sub-admin is already registered for this branch' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newSubAdmin = new SubAdmin({
            name,
            email,
            password: hashedPassword,
            branch
        });

        await newSubAdmin.save();
        return res.status(201).json({ message: 'Sub-admin registered successfully', subAdmin: newSubAdmin });
    } catch (error) {
        console.error('Error registering sub-admin:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Login a SubAdmin
export const loginSubAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if sub-admin exists
        const subAdmin = await SubAdmin.findOne({ email });
        if (!subAdmin) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, subAdmin.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: subAdmin._id, role: subAdmin.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        return res.status(200).json({ message: 'Login successful', token, branch: subAdmin.branch });
    } catch (error) {
        console.error('Error logging in sub-admin:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};