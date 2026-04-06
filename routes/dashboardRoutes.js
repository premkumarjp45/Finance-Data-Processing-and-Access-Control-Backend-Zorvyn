import { dashboardSummary, dashboardCategory, dashboardTrend } from "../controllers/dashboardController.js"
import { authAdmin } from "../middleware/authMiddleware.js"
import express from "express"


const dashboardRouter = express.Router()


dashboardRouter.get("/summary", authAdmin, dashboardSummary)
dashboardRouter.get("/category", authAdmin, dashboardCategory)
dashboardRouter.get("/trends", authAdmin, dashboardTrend)


export default dashboardRouter