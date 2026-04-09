import config from "./config/config.js";
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"
import gigRoute from "./routes/gig.route.js"
// import orderRoute from "./routes/order.route.js"
// import conversationRoute from "./routes/conversation.route.js"
// import messageRoute from "./routes/message.route.js"
// import reviewRoute from "./routes/review.route.js"


const app = express();

app.use(express.json({ limit: "16kb" }));

app.use(cors({
    origin: config.CORS_ORIGIN,
    credentials: true
}))
app.use(cookieParser());


// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
// app.use("/api/orders", orderRoute);
// app.use("/api/conversations", conversationRoute);
// app.use("/api/messages", messageRoute);
// app.use("/api/reviews", reviewRoute);


// Global error handling middleware to catch and format all application errors into JSON responses
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        stack: config.NODE_ENV === "development" ? err.stack : null,// make it production while deploy
    });
});

export default app;