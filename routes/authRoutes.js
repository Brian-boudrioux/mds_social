import { Router } from "express";
import { loginLimiter } from "../middlewares/rateLimiter.js";
import authController from "../controllers/authController.js";

const router = Router();

router.post("/register", authController.register);
router.post("/login", loginLimiter, authController.login);

export default router;