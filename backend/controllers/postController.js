import Comment from "../models/comment.js";
import Like from "../models/like.js";
import Post from "../models/post.js";
import User from "../models/user.js";
import getDataUrl from "../utils/urlGenerator.js";
import { v2 } from "cloudinary";

export const createPost = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(404).json({
        message: "Could not find your details. Please login and try again.",
      });
    }

    const { postCaption } = req.body;

    const file = req.file;

    const type = String(file.mimetype).includes("image") ? "image" : "video";

    const fileUrl = getDataUrl(file);

    // console.log(file.mimetype);

    console.log(type);

    const option = {
      resource_type: type === "video" ? "video" : "image",
      quality: "auto",
      fetch_format: "auto",
      timeout: 60000,
    };

    const myCloud = await v2.uploader.upload(fileUrl.content, option);

    const post = await Post.create({
      postCaption,
      postFileUrl: myCloud.secure_url,
      userId: user.id,
      postType: type,
    });

    console.log(post);

    res.status(200).json({ message: "Successfully created new post", post });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "profilePic_url"],
      },
    });

    if (!post) {
      return res.status(404).json({ message: "No post found" });
    }

    res.status(201).json({
      post,
    });
  } catch (error) {
    console.error(error.message);
  }
};

export const getAllPosts = async (req, res) => {
  try {
    // const userId = req.params.id
    const posts = await Post.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "profilePic_url"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ posts });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllReels = async (req, res) => {
  try {
    const reels = await Post.findAll({
      where: { postType: "video" },
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name", "profilePic_url"],
      },
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({ reels });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const user = req.user;
    const { postCaption } = req.body;

    const post = await Post.findByPk(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "No post found with this ID" });
    }

    if (post.userId !== user.id) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    post.postCaption = postCaption;
    await post.save();

    res.status(200).json({
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong.",
      error: error.message,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id);

    console.log(post);

    if (!post) {
      res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.userId !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized action. You are not allowed to delete this post",
      });
    }

    await v2.uploader.destroy(post.id);
    await post.destroy();

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong.",
    });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findByPk(postId);

    if (!post)
      return res.status(404).json({ message: "Could not find the post" });

    const existingLike = await Like.findOne({ where: { userId, postId } });

    if (existingLike) {
      await existingLike.destroy();
      post.likesCount = await Like.count({ where: { postId } }); // Update likes count
      await post.save();
      return res.json({ message: "Unliked the post", liked: false });
    } else {
      await Like.create({ userId, postId });
      post.likesCount = await Like.count({ where: { postId } }); // Update likes count
      await post.save();
      return res.json({ message: "Post liked successfully", liked: true });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;
    const { content } = req.body;

    const post = await Post.findByPk(postId);

    if (!comment)
      return res.status(400).json({ message: "No content for a comment." });

    if (!post)
      return res.status(404).json({ message: "No post found with this ID" });

    const comment = await Comment.create({
      content,
      postId,
      userId,
    });

    // ✅ Update commentsCount in Post model
    post.commentsCount = await Comment.count({ where: { postId } });
    await post.save();

    return res
      .status(200)
      .json({ message: "Comment added to the post.", comment });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findByPk(commentId);

    if (!comment)
      return res.status(404).json({ message: "No comment found with this ID" });

    if (userId !== comment.userId)
      return res.status(403).json({
        message: "You are not the author and thus not to delete this comment.",
      });

    await comment.destroy();
    return res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Get Comments for a Post
export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
      where: { postId },
      include: [{ model: User, attributes: ["id", "name", "profilePic_url"] }],
      order: [["createdAt", "DESC"]],
    });

    // ✅ Update commentsCount in Post model
    const post = await Post.findByPk(postId);
    post.commentsCount = await Comment.count({ where: { postId } });
    await post.save();

    return res.json({ comments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
