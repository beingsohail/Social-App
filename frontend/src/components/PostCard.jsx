/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BsChatFill, BsThreeDotsVertical } from "react-icons/bs";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { PostData } from "../context/PostContext";

function PostCard({ value, type }) {
  const [isLike, setIsLike] = useState(false);
  const [show, setShow] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const { addComment, fetchComments } = PostData();

  useEffect(() => {
    if (show) {
      fetchComments(value.id).then(setComments);
    }
  }, [show]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    console.log("Comment add function");

    if (!commentText.trim()) return;

    await addComment(value.id, commentText);
    setCommentText("");
    const updatedComments = await fetchComments(value.id);
    setComments(updatedComments);
  };

  return (
    <>
      <div className="bg-[#F8F8F8] shadow-lg text-left rounded-2xl flex flex-col w-[90%] md:w-[35%] mx-auto my-8  border-2 px-2 py-4">
        <div className="flex w-full justify-between items-center p-2">
          <div className="flex gap-2">
            <img
              className="w-[24px] h-[24px] rounded-full"
              src={value.user.profilePic_url}
              alt=""
            />
            <p>{value.user.name}</p>
          </div>

          <BsThreeDotsVertical />
        </div>

        <div className="">
          <p>{value.postCaption}</p>
        </div>
        <div>
          {type == "image" ? (
            <img
              className="w-full h-[20rem] object-cover rounded-[5px]"
              src={value.postFileUrl}
              alt=""
            />
          ) : (
            <video
              className="w-full h-[400px] object-cover rounded-[5px]"
              src={value.postFileUrl}
              controls
            />
          )}
        </div>
        <div className="text-2xl flex items-center  gap-2 mt-2">
          <div className="flex items-center space-x-2">
            <span
              onClick={() => setIsLike(!isLike)}
              className="text-red-500 hover:cursor-pointer"
            >
              {isLike ? <IoHeartSharp /> : <IoHeartOutline />}
            </span>
            <button className="hover:bg-gray-50 hover:cursor-pointer rounded-full p-1">
              {value.likesCount} likes
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShow(!show)}
              className="flex items-center space-x-2"
            >
              <BsChatFill />
              <span>{value.commentsCount} comments</span>
            </button>
          </div>
        </div>
        {show && (
          <form onSubmit={handleAddComment}>
            <input
              type="text"
              placeholder="enter your comment"
              className="bg-white p-2 rounded-2xl w-full focus:outline-none"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button
              type="submit"
              className="bg-amber-400 text-amber-50 font-bold rounded-lg px-4 py-1 mx-auto my-2"
            >
              Add
            </button>
          </form>
        )}

        <hr className="my-2" />
        <p className="text-gray-800 font-semibold">Comments</p>
        <hr className="my-2" />

        <div className="mt-4">
          <div className="comments max-h-[200px] overflow-y-auto">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))
            ) : (
              <p>No comments on the post.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCard;

export const Comment = ({ comment }) => {
  return (
    <div className="flex items-center space-x-2 mt-2">
      <img
        className="w-8 h-8 rounded-full"
        src={comment.user.profilePic_url}
        alt="User"
      />
      <div>
        <p className="text-gray-800 font-semibold">{comment.user.name}</p>
        <p className="text-gray-500 text-sm">{comment.content}</p>
      </div>
    </div>
  );
};
