import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    id: { type:mongoose.Types.ObjectId },
    userId: {
        type: String,
        required: "ID is required",
        unique: true
    },
    password: {
        type: String, 
        required: "PassWord is required",
        trim: true
    }
});

const model = mongoose.model("User", UserSchema);
export default model;