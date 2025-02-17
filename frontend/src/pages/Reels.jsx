/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";

function Reels() {
  const [reels, setReels] = useState([]);

  const { fetchReels } = PostData();

  useEffect(() => {
    async function fetchData() {
      console.log("inside fetch function");
      try {
        const data = await fetchReels(); // Fetch reels
        setReels(data); // Set reels state
      } catch (error) {
        console.error("Error fetching reels:", error);
      }
    }
    fetchData(); // Call async function
  }, []);

  console.log("Here are the reels : ", reels);

  return (
    <>
      <div className="flex items-center justify-center mt-4 mb-2">
        <h1 className="text-2xl text-zinc-700 font-bold">Reels</h1>
      </div>
      <hr className="w-[80%] text-center mx-auto" />

      {reels && reels.length > 0 ? (
        reels.map((reel) => (
          <PostCard value={reel} key={reel.id} type="video" />
        ))
      ) : (
        <h1>There are no reels to show.</h1>
      )}
    </>
  );
}

export default Reels;
