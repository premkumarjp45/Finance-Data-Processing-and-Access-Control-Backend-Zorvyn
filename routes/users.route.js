import express from "express"
import { registerUsers, loginUsers } from "../middleware/auth.user.js"

const userRouter = express.Router()


userRouter.post("/register-user", registerUsers)
userRouter.post("/login-user", loginUsers)

export default userRouter