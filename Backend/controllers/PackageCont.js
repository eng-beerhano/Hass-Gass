import Package from '../models/PackageModel.js';

// Register a new package
export const registerPackage = async (req, res) => {
    const { name, description, price, kg, type } = req.body;
    const image = req.files['image'] ? req.files['image'][0].path : null;
    const images = req.files['images'] ? req.files['images'].map(file => file.path) : [];

    // Validate required fields
    if (!name || !description || !price || !image || !images.length || !kg || !type) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if a package with the same name already exists
        const packageExists = await Package.findOne({ name });
        if (packageExists) {
            return res.status(400).json({ message: 'Package with this name already exists' });
        }

        // Check if a package with the same image already exists
        const imageExists = await Package.findOne({ image });
        if (imageExists) {
            return res.status(400).json({ message: 'Package with this image already exists' });
        }

        // Check if a package with the same images already exists
        const imagesExist = await Package.findOne({ images });
        if (imagesExist) {
            return res.status(400).json({ message: 'Package with these images already exists' });
        }

        // Check if a package with the same kg already exists
        const kgExists = await Package.findOne({ kg });
        if (kgExists) {
            return res.status(400).json({ message: 'Package with this kg already exists' });
        }

        const newPackage = new Package({
            name,
            description,
            price,
            image,
            images,
            kg,
            type
        });

        await newPackage.save();
        return res.status(201).json({ message: 'Package registered successfully', package: newPackage });
    } catch (error) {
        console.error('Error registering package:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all packages
export const getPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        return res.status(200).json({ packages });
    } catch (error) {
        console.error('Error getting packages:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single package by ID
export const getPackageById = async (req, res) => {
    try {
        const packagei = await Package.findById(req.params.id);
        if (!packagei) {
            return res.status(404).json({ message: 'Package not found' });
        }
        return res.status(200).json({ packagei });
    } catch (error) {
        console.error('Error getting package by ID:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a package by ID
export const updatePackage = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, kg, type } = req.body;
    const image = req.files['image'] ? req.files['image'][0].path : null;
    const images = req.files['images'] ? req.files['images'].map(file => file.path) : [];

    try {
        const packagei = await Package.findById(id);
        if (!packagei) {
            return res.status(404).json({ message: 'Package not found' });
        }

        // Update fields
        packagei.name = name || packagei.name;
        packagei.description = description || packagei.description;
        packagei.price = price || packagei.price;
        packagei.kg = kg || packagei.kg;
        packagei.type = type || packagei.type;
        packagei.image = image || packagei.image;
        packagei.images = images.length ? images : packagei.images;

        await packagei.save();
        return res.status(200).json({ message: 'Package updated successfully', package: packagei });
    } catch (error) {
        console.error('Error updating package:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a package by ID
export const deletePackage = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPackage = await Package.findByIdAndDelete(id);
        if (!deletedPackage) {
            return res.status(404).json({ message: 'Package not found' });
        }
        return res.status(200).json({ message: 'Package deleted successfully' });
    } catch (error) {
        console.error('Error deleting package:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};