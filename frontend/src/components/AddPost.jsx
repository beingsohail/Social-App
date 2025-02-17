/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { PostData } from "../context/PostContext";

function AddPost({ type }) {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const [prevFile, setPrevFile] = useState("");

  const { addPost } = PostData();

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("postCaption", caption);
    formdata.append("file", file);

    addPost(formdata);

    console.log("Posted");
  };

  function handleFileChange(e) {
    const uploadedFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadedFile);

    reader.onloadend = () => {
      setPrevFile(reader.result);
      setFile(uploadedFile);
    };
  }

  return (
    <>
      <div className="flex bg-amber-300 p-4 rounded-lg mx-auto mt-8 w-[90%] md:w-[45%]">
        <div className="w-full">
          <form onSubmit={handlePostSubmit} className="w-full flex flex-col">
            <div className="flex gap-2">
              <input
                className="w-[80%] bg-gray-100 px-4 py-2 mx-auto rounded-2xl mt-4 focus:outline-0"
                type="text"
                placeholder="Enter your caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
              />
              <input
                className="w-[7rem] bg-gray-100 px-4 py-2 mx-auto rounded-2xl mt-4"
                type="file"
                accept={type === "image" ? "image/*" : "video/*"}
                onChange={(e) => handleFileChange(e)}
                required
              />
            </div>
            <button className="bg-[#EEEEEE] hover:bg-gray-300 hover:cursor-pointer w-[7rem] mx-auto px-4 py-2 text-lg text-gray-500 font-bold font-sans rounded-xl my-4">
              Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddPost;
