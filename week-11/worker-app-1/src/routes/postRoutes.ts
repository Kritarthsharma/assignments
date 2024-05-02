import { Hono } from "hono";
import {
  getPosts,
  getPost,
  updatePost,
  createPost,
  deletePost,
} from "../controllers/postController";
import postMiddleware from "../middlewares/postMiddleware";
import authMiddleware from "../middlewares/authMiddleware";

const post = new Hono();

post.use("/", authMiddleware);

post.get("/", getPosts);
post.get("/:id", authMiddleware, getPost);
post.post("/", postMiddleware, createPost);
post.patch("/:id", authMiddleware, postMiddleware, updatePost);
post.delete("/:id", authMiddleware, deletePost);

export default post;
