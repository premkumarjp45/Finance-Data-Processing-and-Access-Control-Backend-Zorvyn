import mongoose from "mongoose"

const financeSchema = mongoose.Schema({
    userId: {},
    amount: { type: Number, required: true },
    type: { type: String, enum: ["INCOME", "EXPENSE"], required: true },
    category: { type: String, required: true },
    description: { type: String, required: true }

}, { timestamps: true })


const Finance = mongoose.model("Finance", financeSchema)
export default Finance