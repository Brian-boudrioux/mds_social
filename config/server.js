import express from "express";
import helmet from "helmet";
import cors from "cors";
import userRouter from "../routes/userRoutes.js";
import postRouter from "../routes/postRoutes.js";
import authRouter from "../routes/authRoutes.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { requestLimiter } from "../middlewares/rateLimiter.js";

const app = express();
app.use(helmet({strictTransportSecurity: true, xFrameOptions: true}));
app.use(express.json());
app.use(requestLimiter);
app.use(cors({
    origin: ["http://localhost:3000", "https://monsite.fr"]
}));

app.get("/api", (req, res) => {
    res.send("Bienvenue sur l’API MyDigitalSchool!");
});

app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", authRouter);

app.use(errorHandler);

export default app;