import mongoose from 'mongoose';



const PackageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
      unique: true        
    },
    images: {
        type: Array,
        required: true,
        unique: true
    },
    kg : {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    }
});

const Package = mongoose.model('Package', PackageSchema);
export default Package;