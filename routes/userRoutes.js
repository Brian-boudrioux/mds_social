import { Router } from "express";
import userController from "../controllers/userController.js";
import isAuth from "../middlewares/isAuth.js";

const router = Router();

router.get("/users", userController.getAll);
router.get("/users/:id", userController.getOne);
router.put("/users/:id", isAuth, userController.updateUser);
router.delete("/users/:id", isAuth, userController.deleteUser);

export default router;