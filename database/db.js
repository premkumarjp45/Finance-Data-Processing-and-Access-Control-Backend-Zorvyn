import mongoose from "mongoose"

export const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log(`DATABASE CONNECTED SUCCESSFULLY.`)
    } catch (e) {
        console.log(e.message)
    }
}