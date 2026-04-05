import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, enum: ["ADMIN", "ANALYST", "VIEWER"], required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], required: true }

}, { timestamps: true });


const User = mongoose.model("User", userSchema)
export default User