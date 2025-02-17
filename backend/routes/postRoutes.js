import express from "express";
import {
  addComment,
  createPost,
  deleteComment,
  deletePost,
  getAllPosts,
  getAllReels,
  getComments,
  getPostById,
  likeUnlikePost,
  updatePost,
} from "../controllers/postController.js";
import { isAuth } from "../middlewares/isAuth.js";
import uploadFile from "../middlewares/multer.js";

const postRouter = express.Router();

postRouter.post("/createPost", isAuth, uploadFile, createPost);
postRouter.put("/updatePost/:id", isAuth, updatePost);
postRouter.post("/deletePost/:id", isAuth, deletePost);
postRouter.get("/post/:id", getPostById);
postRouter.get("/posts", getAllPosts);
postRouter.get("/reels", getAllReels);
postRouter.post("/like/:postId", isAuth, likeUnlikePost);
postRouter.post("/comment/:postId", isAuth, addComment);
postRouter.post("/deleteComment/:postId", isAuth, deleteComment);
postRouter.get("/allComments/:postId", getComments);

export default postRouter;
