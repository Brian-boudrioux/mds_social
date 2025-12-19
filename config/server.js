import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import csurf from "csurf";
import userRouter from "../routes/userRoutes.js";
import postRouter from "../routes/postRoutes.js";
import authRouter from "../routes/authRoutes.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import { requestLimiter } from "../middlewares/rateLimiter.js";

const app = express();

app.set("trust proxy", 1);

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(helmet({ strictTransportSecurity: true, xFrameOptions: true }));
app.use(requestLimiter);
app.use(
  cors({
    origin: ["http://localhost:3000", "https://monsite.fr"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Csrf-Token"],
  })
);
const csrfProtection = csurf({
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Lax",
  },
});
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.get("/api", (req, res) => {
  res.send("Bienvenue sur l’API MyDigitalSchool!");
});

app.use("/api", userRouter);
app.use("/api", postRouter);
app.use("/api", authRouter);

app.use(errorHandler);

export default app;
