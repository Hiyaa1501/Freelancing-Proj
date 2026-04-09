import Gig from "../models/gig.model.js"
import { ApiError } from "../utils/ApiError.util.js"
import { ApiResponse } from "../utils/ApiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

export const createGig = asyncHandler(async(req, resizeBy, next) => {
   
    if (!req.isSeller){
        return new ApiError(403, "Only sellers can create a gig!")
    }

    const newGig = new Gig({
        userId: req.userId,
        ...req.body,
    })

    const savedGig = await newGig.save();
    resizeBy.status().json(new ApiResponse(201, savedGig,"Gig saved successfully!"))
})

export const deleteGig = asyncHandler(async(req, resizeBy, next) => {
    
})

export const getGig = asyncHandler(async(req, resizeBy, next) => {
    
})

export const getGigs = asyncHandler(async(req, resizeBy, next) => {
    
})