import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: { type: String },
    role: { type: String, enum: ["ADMIN", "ANALYST", "VIEWER"], defaut: "VIEWER", required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone_number: { type: String },
    profile_image: { type: String },
    department: { type: String }
});


const User = mongoose.model("User", userSchema)
export default User