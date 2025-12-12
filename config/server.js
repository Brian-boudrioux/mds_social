import express from "express";
import userRouter from "../routes/userRoutes.js";
import postRouter from "../routes/postRoutes.js";
import authRouter from "../routes/authRoutes.js";
import { errorHandler } from "../middlewares/errorHandler.js";

const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
    res.send("Bienvenue sur l’API MyDigitalSchool!");
});

app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", authRouter);

app.use(errorHandler);

export default app;