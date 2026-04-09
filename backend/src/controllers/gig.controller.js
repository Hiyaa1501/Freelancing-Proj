import Gig from "../models/gig.model.js"
import { ApiError } from "../utils/ApiError.util.js"
import { ApiResponse } from "../utils/ApiResponse.util.js"
import { asyncHandler } from "../utils/asyncHandler.util.js"

export const createGig = asyncHandler(async(req, res, next) => {
   
    if (!req.isSeller){
        throw new ApiError(403, "Only sellers can create a gig!")
    }

    const newGig = new Gig({
        userId: req.userId,
        ...req.body,
    })

    const savedGig = await newGig.save();
    res.status().json(new ApiResponse(201, savedGig,"Gig saved successfully!"))
})

export const deleteGig = asyncHandler(async(req, res, next) => {
    const gig = await Gig.findById(req.params.id)
    if (gig.userId !== req.userId) {
        throw new ApiError(403, "You can delete only your gig!")}

    await Gig.findByIdAndDelete(req.params.id)
    res.status(200).json(new ApiResponse(200, {}, "Gig has been deleted!"))
    })

export const getGig = asyncHandler(async(req, res, next) => {
    const gig = await Gig.findById(req.params.id)
    if (!gig) {
        throw new ApiError(404, "Gig not found!")    
    }
    res.status(200).json(new ApiResponse(200, gig, ""))
})

export const getGigs = asyncHandler(async(req, res, next) => {
    const q = req.query;
    const filters = {
        ...(q.userId && { userId: q.userId }),
        ...(q.cat && { cat: q.cat}),
        ...((q.min || q.max) && {
            price: {
                ...(q.min && { $qt: q.min }),
                ...(q.max && { $lt: q.max })
            },
        })
        ...(q.search && { title: { $regex: q.search, $options: "i"}}),
    }

    const gigs = await Gig.find(filters).sort({ [q.sort]: -1 })
    res.status(200).json(new ApiResponse(200, gigs, ""))
})