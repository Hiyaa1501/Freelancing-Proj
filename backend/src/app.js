import express from "express"
import cors from "cors"
import noteModel from "./models/note.model.js";

const app = express();

app.use(express.json({ limit: "16kb" }));

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))




export default app 