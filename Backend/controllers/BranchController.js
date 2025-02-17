import Branch from "../models/Branch.js";

// Register a new branch
export const registerBranch = async (req, res) => {
    const { name, address, phone, email } = req.body;

    try {
        const newBranch = new Branch({
            name,
            address,
            phone,
            email
        });
        
        if (!name || !address || !phone || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        // Check if branch with the same email already exists
        const branchExists = await Branch.findOne({ email });
        if (branchExists) {
            return res.status(400).json({ message: 'Branch already exists' });
        }
        
        // Check if branch with the same phone number already exists
        const phoneExists = await Branch.findOne({ phone });
        if (phoneExists) {
            return res.status(400).json({ message: 'Phone number already exists' });
        }
        
        // Check if branch with the same name already exists
        const nameExists = await Branch.findOne({ name });
        if (nameExists) {
            return res.status(400).json({ message: 'Branch name already exists' });
        }
        
        // Check if branch with the same address already exists
        const addressExists = await Branch.findOne({ address });
        if (addressExists) {
            return res.status(400).json({ message: 'Branch address already exists' });
        }

        await newBranch.save();
        return res.status(201).json({ message: 'Branch registered successfully', branch: newBranch });
    } catch (error) {
        console.error('Error registering branch:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all branches
export const getBranches = async (req, res) => {
    try {
        const branches = await Branch.find();
        return res.status(200).json({ branches });
    } catch (error) {
        console.error('Error getting branches:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a branch
export const updateBranch = async (req, res) => {
    const { name, address, phone, email } = req.body;
    const { id } = req.params;

    try {
        const branch = await Branch.findById(id);
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        branch.name = name || branch.name;
        branch.address = address || branch.address;
        branch.phone = phone || branch.phone;
        branch.email = email || branch.email;

        await branch.save();
        return res.status(200).json({ message: 'Branch updated successfully', branch });
    } catch (error) {
        console.error('Error updating branch:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a branch
export const deleteBranch = async (req, res) => {
    const { id } = req.params;

    try {
        const branch = await Branch.findByIdAndDelete(id);
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        return res.status(200).json({ message: 'Branch deleted successfully' });
    } catch (error) {
        console.error('Error deleting branch:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};