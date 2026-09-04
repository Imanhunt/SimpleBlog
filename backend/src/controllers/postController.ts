import { Request, Response } from "express";

import {
  getAllPosts,
  createNewPost,
  findPostById,
  deletePostById,
  updatePostById
} from "../models/postModel";

// GET ALL POSTS
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    console.error("Get posts error:", error);

    res.status(500).json({
      message: "Failed to get posts"
    });
  }
};

// CREATE POST
export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    const newPost = await createNewPost(title, content);

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Create post error:", error);

    res.status(500).json({
      message: "Failed to create post"
    });
  }
};

// GET POST BY ID
export const getPostById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const post = await findPostById(id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.json(post);
  } catch (error) {
    console.error("Get post error:", error);

    res.status(500).json({
      message: "Failed to get post"
    });
  }
};

// DELETE POST
export const deletePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const deletedPost = await deletePostById(id);

    if (!deletedPost) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.json({
      message: "Post deleted successfully",
      post: deletedPost
    });
  } catch (error) {
    console.error("Delete post error:", error);

    res.status(500).json({
      message: "Failed to delete post"
    });
  }
};

// UPDATE POST
export const updatePost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, content } = req.body;

    const updatedPost = await updatePostById(
      id,
      title,
      content
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.json({
      message: "Post updated successfully",
      post: updatedPost
    });
  } catch (error) {
    console.error("Update post error:", error);

    res.status(500).json({
      message: "Failed to update post"
    });
  }
};