import config from "../config/index.js";
import { ApiError } from "../utils/ApiError.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    require.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ", "")

    if (! token ) {
        throw new ApiError(401, "Unauthorized request"); 
    }

    jwt.verify(token, config.JWT_SERCRET)

    
});