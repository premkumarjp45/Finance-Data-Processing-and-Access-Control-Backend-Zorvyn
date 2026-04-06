import { dashboardSummary } from "../middleware/dashboardMiddleware.js"
import { authAdmin } from "../middleware/authAdmin.js"
import express from "express"


const dashboardRouter = express.Router()


dashboardRouter.get("/summary", authAdmin, dashboardSummary)




export default dashboardRouter