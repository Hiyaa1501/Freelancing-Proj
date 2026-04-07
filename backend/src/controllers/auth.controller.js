import  config  from "../config/config.js"
import User from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.util.js"
import { ApiResponse } from "../utils/ApiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const register = asyncHandler(async (req, res, next) => {

    const { username, email } = req.body;
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "Username or email already present!")
    }

    const newUser = new User({
        ...req.body,
    })

    await newUser.save();
    const createdUser = await User.findById(newUser._id).select("-password");

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User has been created successfully.")
    )
})


export const login = asyncHandler(async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    
    if (!user) {
        throw new ApiError(404, "User not found!");
    }

    const isCorrect = await bcrypt.compare(password, user.password);

    if (!isCorrect) {
        throw new ApiError(400, "Wrong password or username");
    }

    const token = jwt.sign(
        {
            id: user._id,
            isSeller: user.isSeller
        },
        config.JWT_SECRET
    );

    const { password: userPassword, ...info } = user._doc;

    
    return res
        .cookie("accessToken", token, {
            httpOnly: true,
            secure:false, //make it true while deploy 
            sameSite: "none"
        })
        .status(200) 
        .json(new ApiResponse(200, info, "User logged in successfully"));
});


export const logout = asyncHandler(async(req, res) => {
    res.clearCookie("accessToken", {
        sameSite: "none",
        secure: "false",
        sameSite: "lax",
        path: "/",
    })
    .status(200)
    .json(new ApiResponse(200, {}, "User has been logged out."))
})