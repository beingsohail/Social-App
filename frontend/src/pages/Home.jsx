/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import AddPost from "../components/AddPost";
import PostCard from "../components/PostCard";
import { PostData } from "../context/PostContext";

function Home() {
  const { posts } = PostData();

  console.log(posts.posts);

  return (
    <>
      <div>
        <AddPost />
      </div>
      <div className="flex flex-col gap-4 mt-4 items-center justify-center text-center">
        <hr className="w-[80%] bg-amber-400 h-[2px] border-0" />
        <h1 className="text-2xl my-0 font-bold text-zinc-800">Your Feed</h1>
        <hr className="w-[80%] bg-amber-400 h-[2px] border-0" />
      </div>
      <div>
        {posts.posts && posts.posts.length > 0 ? (
          posts.posts.map((post) => (
            <PostCard value={post} key={post.id} type={post.postType} />
          ))
        ) : (
          <p>No Posts available</p>
        )}
      </div>
    </>
  );
}

export default Home;
