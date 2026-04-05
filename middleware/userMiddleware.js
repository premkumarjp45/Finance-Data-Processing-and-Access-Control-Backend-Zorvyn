import bcrypt from "bcrypt"
import validator from "validator"
import User from "../models/user.js"

export const registerUsers = async (req, res) => {

    const { name = undefined, email = undefined, password = undefined, role = undefined } = req.body



    if (!name && !email && !password && !role) {
        return res.status(400).json({ error: "required fields missing" })
    }

    if (!name) {
        return res.status(400).json({ error: "Name is required" })
    }


    if (!email) {
        return res.status(400).json({ error: "Email is required" })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" })

    }

    if (!password) {
        return res.status(400).json({ error: "Password is required" })
    }
    if (!role) {
        return res.status(400).json({ error: "Role is required" })
    }

    const roles = ["ADMIN", "ANALYST", "VIEWER"];
    if (!roles.includes(role)) {
        return res.status(400).json({ error: "Invalid Role" })
    }

    if (password.length < 5) {
        return res.status(400).json({ error: "Password must be at least 6 characters" })

    }

    const isUser = await User.findOne({ email: email }) || null

    console.log(isUser)

    if (isUser) {
        return res.status(409).json({ error: "Email already registered" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const createUser = User({
        name: name,
        email: email,
        password: hashedPassword,
        role: role
    })
    await createUser.save()
    return res.status(201).json({ success: "User registered successfully" })






}


export const loginUsers = async (req, res) => {

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



}