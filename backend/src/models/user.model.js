import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        // for both user and freelancer
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        password: {
            type: String,
            required: [true, "Password is true"]
        },
        avatar: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["freelancer", "client"],
            required: true
        },

        // --- Freelancer Fields ---

        bio: {
            type: String,
            maxlength: 500,
        },
        // Freelancers fill this, Clients can leave it empty
        skills: [{
            type: String,
            index: true,
        }],
        hourlyRate: {
            type: Number,
            default: 0,
        },
        // --- Reputation ---
        rating: {
            type: Number,
            default: 0,
        },
        refreshToken: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

