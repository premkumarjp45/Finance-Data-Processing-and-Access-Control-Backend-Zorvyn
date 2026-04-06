import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./database/db.js"
dotenv.config()
import userRouter from "./routes/userRoutes.js"
import financeRouter from "./routes/financeRoutes.js"
import dashboardRouter from "./routes/dashboardRoutes.js"
const app = express()


app.use(express.json())
app.use(cors())


const PORT = process.env.PORT || 5000

app.use("/api/user", userRouter)
app.use("/api/finance", financeRouter)
app.use("/api/dashboard", dashboardRouter)
app.get("/", (req, res) => {
    res.status(200).json({ success: "API WORKING" })
})
app.listen(PORT, () => {
    console.log(`SERVER WORKING ON SERVER ${PORT}`)
    connectDB()
})

