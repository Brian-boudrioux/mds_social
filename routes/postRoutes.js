import { Router } from "express";
import postController from "../controllers/postController.js";
import isAuth from "../middlewares/isAuth.js";

const router = Router();

router.get("/posts", postController.getAll);
router.get("/posts/:id", postController.getOne);
router.post("/posts", isAuth, postController.createPost);
router.put("/posts/:id", isAuth, postController.updatePost);
router.delete("/posts/:id", isAuth, postController.deletePost);

export default router;