import mongoose from "mongoose";


const branchSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true , unique: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
}
);

const Branch = mongoose.model("Branch", branchSchema);

export default Branch;