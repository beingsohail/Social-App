/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const PostContext = createContext();

export const PostContextProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get("/api/post/posts");
      console.log("All posts are being fetched...");
      console.log(data);
      setPosts(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchReels = async () => {
    try {
      const { data } = await axios.get("/api/post/reels");
      // console.log(data.reels);
      setReels(data.reels);
      return data.reels;
    } catch (error) {
      console.error(error.message);
    }
  };

  async function addPost(formdata) {
    try {
      const { data } = await axios.post("/api/post/createPost", formdata);
      console.log(data);
      toast.success(data.message);
      fetchPosts();
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  }

  async function addComment(postId, commentContent) {
    try {
      const { data } = await axios.post(`/api/post/comment/${postId}`, {
        content: commentContent,
      });
      toast.success(data.message);
      fetchPosts(); // Refresh posts to update the commentsCount
    } catch (error) {
      console.error(error.message);
      console.log("Issue is in adding comments.");
      toast.error("Failed to add comment.");
    }
  }

  async function fetchComments(postId) {
    try {
      const { data } = await axios.get(`/api/post/allComments/${postId}`);
      return data.comments;
    } catch (error) {
      console.error(error.message);
      console.log("Issue is in fetching comments.");

      return [];
    }
  }

  async function likePost(id) {
    try {
      const { data } = await axios.post("/api/post/like/" + id);
      toast.success(data.message);
      fetchPosts();
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        loading,
        posts,
        reels,
        addPost,
        fetchReels,
        addComment,
        fetchComments,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const PostData = () => useContext(PostContext);
