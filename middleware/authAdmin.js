import jwt from "jsonwebtoken"
import User from "../models/user.js"






export const authAdmin = async (req, res, next) => {

    const authHeaders = req.headers['authorization']
    if (!authHeaders) {
        return res.status(401).json({ error: "Missing JWT Token" })
    }
    const jwtToken = authHeaders.split(" ")[1]

    let user;
    jwt.verify(jwtToken, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
            return res.status(401).json({ error: "Invalid JWT Token" })
        }
        const { email, userId, role } = payload

        if (role !== "ADMIN") {
            return res.status(403).json({ error: "Access denied. Admin only" })
        }

        user = {
            userId, email, role
        }
        req.user = user


    })
    const isAdmin = await User.findOne({ email: user.email })
    if (isAdmin.role !== "ADMIN") {
        return res.status(403).json({ error: "Access denied. Admin only" })
    }

    next()

}


export const authViewer = async (req, res, next) => {

    const authHeaders = req.headers['authorization']
    if (!authHeaders) {
        return res.status(401).json({ error: "Missing JWT Token" })
    }
    const jwtToken = authHeaders.split(" ")[1]

    let user;
    jwt.verify(jwtToken, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
            return res.status(401).json({ error: "Invalid JWT Token" })
        }

        if (!payload.email) {
            return res.status(401).json({ error: "Invalid JWT Token" })
        }
        const { email, userId, role } = payload
        user = {
            userId, email, role
        }
        req.user = user


    })

    const isUser = await User.findOne({ email: user.email })
    if (!isUser) {
        return res.status(403).json({ error: "Access denied" })
    }

    next()

}




export const authAdminAndAnalyst = async (req, res, next) => {

    const authHeaders = req.headers['authorization']
    if (!authHeaders) {
        return res.status(401).json({ error: "Missing JWT Token" })
    }
    const jwtToken = authHeaders.split(" ")[1]

    let user;
    jwt.verify(jwtToken, process.env.JWT_SECRET, (error, payload) => {
        if (error) {
            return res.status(401).json({ error: "Invalid JWT Token" })
        }
        const { email, userId, role } = payload

        if (role === "VIEWER") {
            return res.status(403).json({ error: "Access denied. Admin and Analyst only" })
        }

        user = {
            userId, email, role
        }
        req.user = user


    })
    const isAdmin = await User.findOne({ email: user.email })
    if (isAdmin.role === "VIEWER") {
        return res.status(403).json({ error: "Access denied. Admin and Analyst only" })
    }

    next()

}

