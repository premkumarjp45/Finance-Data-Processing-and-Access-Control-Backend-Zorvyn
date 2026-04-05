import mongoose from "mongoose"

const financeSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["INCOME", "EXPENSE"], required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    description: { type: String, required: true }

}, { timestamps: true })


const Finance = mongoose.model("Finance", financeSchema)
export default Finance