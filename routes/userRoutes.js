import express from "express"
import { registerUsers, loginUsers } from "../controllers/userController.js"

const userRouter = express.Router()


userRouter.post("/register", registerUsers)
userRouter.post("/login", loginUsers)

export default userRouter