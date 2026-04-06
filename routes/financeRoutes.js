import express from "express"
import { createFinanceRecord, getAllRecords, getSingleRecord, updateRecord, deleteRecord, filterRecords } from "../controllers/financeController.js"
import { authAdmin, authViewer, authAdminAndAnalyst } from "../middleware/authMiddleware.js"
const financeRouter = express.Router()


financeRouter.post("/create-record", authAdmin, createFinanceRecord)
financeRouter.get("/records", authViewer, getAllRecords)
financeRouter.get("/record/:recordId", authAdminAndAnalyst, getSingleRecord)
financeRouter.put("/record/:recordId", authAdmin, updateRecord)
financeRouter.delete("/record/:recordId", authAdmin, deleteRecord)
financeRouter.get("/filter-records", authAdmin, filterRecords)




export default financeRouter