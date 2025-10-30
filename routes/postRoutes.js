import { Router } from "express";
import postController from "../controllers/postController.js";

const router = Router();

router.get("/posts", postController.getAll);
router.get("/posts/:id", postController.getOne);
router.post("/posts", postController.createPost);
router.put("/posts/:id", postController.updatePost);
router.delete("/posts/:id", postController.deletePost);

export default router;