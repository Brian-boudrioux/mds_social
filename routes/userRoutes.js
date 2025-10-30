import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.get("/users", userController.getAll);
router.get("/users/:id", userController.getOne);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

export default router;