import bcrypt from "bcrypt"
import User from "../models/user.js"

export const registerUsers = async (req, res) => {


    try {
        const { email, password, role } = req.body
        const isUser = await User.findOne({ email: email })

        if (isUser === null) {
            const roles = ["ADMIN", "ANALYST", "VIEWER"];
            if (!roles.includes(role)) {
                return res.status(400).json({ error: "Invalid Role." })
            }

            if (password.length >= 6) {
                const hashedPassword = await bcrypt.hash(password, 10)
                const createUser = User({
                    email: email,
                    password: hashedPassword,
                    role: role
                })
                await createUser.save()
                return res.status(200).json({ success: "User registered successfully" })


            }
            return res.status(400).json({ error: "Password length should be greater than 6 " })

        }
        return res.status(409).json({ error: "email already registred." })




    } catch (e) {
        return res.status(500).json({
            error: e.message
        })
    }
}


export const loginUsers = async (req, res) => {
    try {

        const { email, password } = req.body
        const isUser = await User.findOne({ email: email })
        console.log(isUser)
        if (!isUser) {
            return res.status(400).json({ message: "User is not registered." })
        }

        const isTruePassword = await bcrypt.compare(password, isUser.password)
        if (!isTruePassword) {
            return res.status(400).json({ message: "invalid password" })
        }


    } catch (e) {
        return res.status(500).json({
            error: e.message
        })
    }
}