import TrackOrder from '../models/TrackOrder.js';

// Create a new track order
export const createTrackOrder = async (req, res) => {
    const { name, address, phone, city, branch } = req.body;

    try {
        const newTrackOrder = new TrackOrder({
            name,
            address,
            phone,
            city,
            branch
        });

        await newTrackOrder.save();
        return res.status(201).json({ message: 'Track order created successfully', trackOrder: newTrackOrder });
    } catch (error) {
        console.error('Error creating track order:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all track orders
export const getTrackOrders = async (req, res) => {
    try {
        const trackOrders = await TrackOrder.find();
        return res.status(200).json(trackOrders);
    } catch (error) {
        console.error('Error fetching track orders:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single track order by ID
export const getTrackOrderById = async (req, res) => {
    try {
        const trackOrder = await TrackOrder.findById(req.params.id);
        if (!trackOrder) {
            return res.status(404).json({ message: 'Track order not found' });
        }
        return res.status(200).json(trackOrder);
    } catch (error) {
        console.error('Error fetching track order:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a track order by ID
export const updateTrackOrder = async (req, res) => {
    try {
        const updatedTrackOrder = await TrackOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTrackOrder) {
            return res.status(404).json({ message: 'Track order not found' });
        }
        return res.status(200).json({ message: 'Track order updated successfully', trackOrder: updatedTrackOrder });
    } catch (error) {
        console.error('Error updating track order:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a track order by ID
export const deleteTrackOrder = async (req, res) => {
    try {
        const deletedTrackOrder = await TrackOrder.findByIdAndDelete(req.params.id);
        if (!deletedTrackOrder) {
            return res.status(404).json({ message: 'Track order not found' });
        }
        return res.status(200).json({ message: 'Track order deleted successfully' });
    } catch (error) {
        console.error('Error deleting track order:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};