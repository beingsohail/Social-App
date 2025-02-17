/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { IoHome } from "react-icons/io5"; // <IoHome />
import { IoHomeOutline } from "react-icons/io5"; // <IoHomeOutline />
import { IoChatbubblesOutline } from "react-icons/io5"; // <IoChatbubblesOutline />
import { IoChatbubblesSharp } from "react-icons/io5"; // <IoChatbubblesSharp />
import { IoSearchCircleSharp } from "react-icons/io5";
import { IoSearchCircleOutline } from "react-icons/io5";
import { BsCameraReels } from "react-icons/bs";
import { BsCameraReelsFill } from "react-icons/bs";
import { RiAccountCircleFill } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { Link } from "react-router-dom";

function Navbar() {
  const [tab, setTab] = useState(window.location.pathname);

  return (
    <>
      <div className="fixed bottom-0 w-full bg-amber-300">
        <div className="flex justify-around h-full px-4 py-4 text-2xl">
          <Link to={"/"} onClick={() => setTab("/")}>
            <span>{tab === "/" ? <IoHome /> : <IoHomeOutline />}</span>
          </Link>
          <Link to={"/reels"} onClick={() => setTab("reels")}>
            <span>
              {tab === "reels" ? <BsCameraReelsFill /> : <BsCameraReels />}
            </span>
          </Link>
          <Link to={"/chat"} onClick={() => setTab("chat")}>
            <span>
              {tab === "chat" ? (
                <IoChatbubblesSharp />
              ) : (
                <IoChatbubblesOutline />
              )}
            </span>
          </Link>
          <Link to={"/search"} onClick={() => setTab("search")}>
            <span>
              {tab === "search" ? (
                <IoSearchCircleSharp />
              ) : (
                <IoSearchCircleOutline />
              )}
            </span>
          </Link>
          <Link to={"/account"} onClick={() => setTab("account")}>
            <span>
              {tab === "account" ? (
                <RiAccountCircleFill />
              ) : (
                <RiAccountCircleLine />
              )}
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
