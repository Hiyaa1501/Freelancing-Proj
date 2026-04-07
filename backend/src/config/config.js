import dotenv from 'dotenv';
import { ApiError } from '../utils/ApiError.util.js';

dotenv.config();

if (!process.env.PORT) {
    throw new ApiError(404, 'PORT is not defined in .env file');
}

if (!process.env.MONGODB_URI) {
    throw new ApiError(404, 'MONGODB_URI is not defined in .env file');
}

if (!process.env.CLOUDINARY_CLOUD_NAME) {
    throw new ApiError(404, 'CLOUDINARY_CLOUD_NAME is not defined in .env file');
}

if (!process.env.CLOUDINARY_API_KEY) {
    throw new ApiError(404, 'CLOUDINARY_API_KEY is not defined in .env file');
}

if (!process.env.CLOUDINARY_API_SECRET) {
    throw new ApiError(404, 'CLOUDINARY_API_SECRET is not defined in .env file');
}

if (!process.env.CORS_ORIGIN) {
    throw new ApiError(404, `CORS_ORIGIN is not defined in .env file`);
}

if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new ApiError(404, `ACCESS_TOKEN_SECRET is not defined in .env file`);
}

if (!process.env.ACCESS_TOKEN_EXPIRY) {
    throw new ApiError(404, `ACCESS_TOKEN_EXPIRY is not defined in .env file`);
}

if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new ApiError(404, `REFRESH_TOKEN_SECRET is not defined in .env file`);
}

if (!process.env.REFRESH_TOKEN_EXPIRY) {
    throw new ApiError(404, `REFRESH_TOKEN_EXPIRY is not defined in .env file`);
}

if (!process.env.JWT_SECRET) {
    throw new ApiError(404, `JWT_SECRET is not defined in .env file`)
}

if (!process.env.NODE_ENV) {
    throw new ApiError(404, `NODE_ENV is not defined in .env file`)
}
const config = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,   
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
    JWT_SECRET: process.env.JWT_SECRET,
    NODE_ENV: process.env.NODE_ENV
};

export default config;