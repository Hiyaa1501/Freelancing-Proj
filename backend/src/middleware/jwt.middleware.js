import jwt from "jsonwebtoken"
import config from "../config/config.js"
import { ApiError } from "../utils/ApiError.util"

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return next(ApiError(401, "You are not authenticated!"))

        jwt.verify(token, config.JWT_SERCRET, async (err, payload) => {
            if (err) return next(ApiError(403, "Token is not valid!"))
                req.userId = payload.id,
                req.isSeller = payload.isSeller
                next()
        })
    }

