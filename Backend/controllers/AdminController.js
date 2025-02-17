import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        const admin = await
        Admin.findOne({ email }).exec();
        
        if (admin) {
            return res.status(400).json({ message: "Admin already exists" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newAdmin = new Admin({ name, email, password: hashedPassword });
        
        await newAdmin.save();
        
        // const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        
        // res.json({ token });
        res.status(201).json({ message: "Admin created successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const admin = await Admin.findOne({ email }).exec();
        
        if (!admin) {
            return res.status(400).json({ message: "Admin not found" });
        }
        
        const isMatch = await bcrypt.compare(password, admin.password);
        
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        
        res.json({ token });
        res.cookie("token", token, { httpOnly: true });
        
        res.status(200).json({ message: "Admin signed in successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Logout

export const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Admin logged out successfully" });
};