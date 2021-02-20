import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: "User ID is required",
        unique: true,
        trim: true
    },
    userPW: {
        type: String,
        required: "Password is required",
        trim: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    name: String,
    email: String,
    avatarUrl: String,
    phone: String,
    salt: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products Cart"
    }]
});

const model = mongoose.model("user", UserSchema);
export default model;