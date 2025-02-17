import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const conn = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // ssl: true,
            // tlsInsecure: true, // Use this option if you are facing SSL/TLS issues
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default conn;