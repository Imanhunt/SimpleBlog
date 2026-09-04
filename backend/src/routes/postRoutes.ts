import express from "express";
import {
  getPosts,
  createPost,
  getPostById,
  deletePost,
  updatePost
} from "../controllers/postController";

const router = express.Router();


router.get("/", getPosts);

router.post("/", createPost);

router.get("/:id", getPostById);

router.delete("/:id", deletePost);

router.put("/:id", updatePost);

export default router;