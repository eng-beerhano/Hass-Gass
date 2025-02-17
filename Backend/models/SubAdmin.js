import mongoose from 'mongoose';
// import Branch from './Branch.js';

const SubAdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

//    Branch
    branch: {
        type: String,
        required: true,
        ref: 'Branch'
    },
    role: {
        type: String,
        required: true,
        default: 'subAdmin'
    }
});


const SubAdmin = mongoose.model('SubAdmin', SubAdminSchema);

export default SubAdmin;
