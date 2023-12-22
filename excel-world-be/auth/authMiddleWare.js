import jwt from 'jsonwebtoken'


// user UserMiddleWare
export const userAuthMiddleWare = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(404).send({ success: false, message: "Token is invalid" })
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).send({ success: false, message: "Token is wrong" })
        }
        if (user.role !== 'user') {
            return res.status(403).send({ success: false, message: "You are not user" })
        }
        req.user = user
        next()
    })
}


// user AdminMiddleWare
export const AdminAuthMiddleWare = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        return res.status(404).send({ success: false, message: "Token is invalid" })
    }
    jwt.verify(token, process.env.JWT_SECRET_ADMIN, (err, admin) => {
        if (err) {
            return res.status(401).send({ success: false, message: "Token is wrong" })
        }
        if (admin.role !== 'admin') {
            return res.status(403).send({ success: false, message: "You are not admin" })
        }
        req.admin = admin
        next()
    })
}
