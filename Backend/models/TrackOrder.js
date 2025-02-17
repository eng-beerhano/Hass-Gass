import mongoose from 'mongoose';



const TrackOrderSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    city : {
        type: String,
        required: true
    },
    branch : {
        type: String,
        required: true,
        ref: 'Branch'
    },
});

const TrackOrder = mongoose.model('TrackOrder', TrackOrderSchema);

export default TrackOrder;