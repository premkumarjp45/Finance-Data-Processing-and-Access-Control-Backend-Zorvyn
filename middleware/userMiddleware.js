import bcrypt from "bcrypt"
import validator from "validator"
import jwt from "jsonwebtoken"
import User from "../models/user.js"



const generateJwt = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET)
}

export const registerUsers = async (req, res) => {

    const { name = undefined, email = undefined, password = undefined, role = undefined, status = undefined } = req.body



    if (!name && !email && !password && !role) {
        return res.status(400).json({ error: "Required fields missing" })
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

    if (!status) {
        return res.status(400).json({ error: "Status is required" })
    }

    const statusList = ["active", "inactive"]
    if (statusList.includes(status)) {
        return res.status(400).json({ error: "Invalid status" })
    }

    if (password.length < 5) {
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

    const { email = undefined, password = undefined } = req.body


    if (!email && !password) {
        return res.status(400).json({ error: "Required fields missing" })
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

    const isUser = await User.findOne({ email: email })

    if (!isUser) {
        return res.status(400).json({ error: "User not found" })
    }

    const isTruePassword = await bcrypt.compare(password, isUser.password)


    if (!isTruePassword) {
        return res.status(400).json({ error: "Invalid credentials" })
    }

    const jwtToken = generateJwt({ email })

    return res.status(200).json({
        "jwt_token": jwtToken
    })



}