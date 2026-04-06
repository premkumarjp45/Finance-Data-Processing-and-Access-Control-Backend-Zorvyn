import jwt from "jsonwebtoken"






export const authAdmin = async (req, res, next) => {


    try {

        const authHeaders = req.headers['authorization']
        if (!authHeaders) {
            return res.status(401).json({ error: "Missing JWT Token" })
        }
        const jwtToken = authHeaders.split(" ")[1]


        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET)


        if (payload.role !== "ADMIN") {
            return res.status(403).json({ error: "Access denied. Admin only" })
        }
        req.user = payload

        next()

    } catch (e) {
        return res.status(401).json({ error: "Invalid JWT Token" })
    }



}


export const authViewer = async (req, res, next) => {

    try {

        const authHeaders = req.headers['authorization']
        if (!authHeaders) {
            return res.status(401).json({ error: "Missing JWT Token" })
        }
        const jwtToken = authHeaders.split(" ")[1]


        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET)

        const roles = ["ADMIN", "ANALYST", "VIEWER"]
        if (!roles.includes(payload.role)) {
            return res.status(403).json({ error: "Access denied. Admin , Analyst & Viewer only" })
        }
        req.user = payload

        next()

    } catch (e) {
        return res.status(401).json({ error: "Invalid JWT Token" })

    }


}




export const authAdminAndAnalyst = async (req, res, next) => {

    try {

        const authHeaders = req.headers['authorization']
        if (!authHeaders) {
            return res.status(401).json({ error: "Missing JWT Token" })
        }
        const jwtToken = authHeaders.split(" ")[1]


        const payload = jwt.verify(jwtToken, process.env.JWT_SECRET)

        const roles = ["ADMIN", "ANALYST"]
        if (!roles.includes(payload.role)) {
            return res.status(403).json({ error: "Access denied. Admin , Analyst only" })
        }
        req.user = payload

        next()

    } catch (e) {
        return res.status(401).json({ error: "Invalid JWT Token" })

    }

}

