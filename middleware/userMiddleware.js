import bcrypt from "bcrypt"
import validator from "validator"
import jwt from "jsonwebtoken"
import User from "../models/user.js"



const generateJwt = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET)
}

export const registerUsers = async (req, res) => {

    let { name = "", email = "", password = "", role = "", status = "" } = req.body

    name = name.trim()
    email = email.trim().toLowerCase()
    password = password.trim()
    role = role.trim()
    status = status.trim()

    if (name === "" && email === "" && password === "" && role === "" && status === "") {
        return res.status(400).json({ error: "Required fields missing" })
    }

    if (!name || name === "") {
        return res.status(400).json({ error: "Name is required" })
    }


    if (!email || email === "") {
        return res.status(400).json({ error: "Email is required" })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" })

    }

    if (!password || password === "") {
        return res.status(400).json({ error: "Password is required" })
    }

    if (!role || role === "") {
        return res.status(400).json({ error: "Role is required" })
    }

    const roles = ["ADMIN", "ANALYST", "VIEWER"];

    if (!roles.includes(role)) {
        return res.status(400).json({ error: "Invalid Role" })
    }

    if (!status || status === "") {
        return res.status(400).json({ error: "Status is required" })
    }

    const statusList = ["active", "inactive"]
    if (!statusList.includes(status)) {
        return res.status(400).json({ error: "Invalid status" })
    }

    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters" })

    }


    const isUser = await User.findOne({ email: email }) || null



    if (isUser) {
        return res.status(409).json({ error: "Email already registered" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const createUser = User({
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
        status: status
    })

    await createUser.save()

    return res.status(201).json({ success: "User registered successfully" })






}


export const loginUsers = async (req, res) => {

    let { email = "", password = "" } = req.body
    email = email.trim().toLowerCase()
    password = password.trim()

    if (!email && !password) {
        return res.status(400).json({ error: "Required fields missing" })
    }

    if (!email || email === "") {
        return res.status(400).json({ error: "Email is required" })
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" })
    }

    if (!password || password === "") {
        return res.status(400).json({ error: "Password is required" })
    }

    const isUser = await User.findOne({ email: email })

    if (!isUser) {
        return res.status(400).json({ error: "User not found" })
    }
    if (isUser.status === "inactive") {
        return res.status(400).json({ error: "User inactive" })
    }

    const isTruePassword = await bcrypt.compare(password, isUser.password)


    if (!isTruePassword) {
        return res.status(400).json({ error: "Invalid credentials" })
    }

    const jwtToken = generateJwt({ email: isUser.email, userId: isUser._id, role: isUser.role })

    return res.status(200).json({
        "jwt_token": jwtToken
    })



}