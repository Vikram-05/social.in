import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

function authMiddleware(req, res, next) {
    try {
        const token = req.cookies?.token || req.headers?.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json("Token not found");
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
        // console.log("dec ",decode)
        req.user = decode;
        next();
    } catch (err) {
        console.log("error in auth middleware ", err)
    }
}

export {
    authMiddleware
}