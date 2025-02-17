/* eslint-disable no-unused-vars */
import React from "react";
import { PiCat } from "react-icons/pi";
import { TbError404 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function Notfound() {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full min-h-screen mt-12">
        <div className="w-full h-screen flex items-center justify-center -translate-y-36 flex-col gap-8">
          <div className="flex items-center gap-2 text-[4rem] font-bold">
            <h1>OOPS...</h1>
          </div>
          <div className="flex items-center gap-4 text-amber-600 text-[300%]">
            <PiCat />
            <p>Page not found</p>
          </div>
          <div className="bg-amber-400 px-4 py-2 text-lg font-bold text-amber-50 rounded-md hover:bg-amber-500 hover:cursor-pointer">
            <button onClick={() => navigate("/")}>Go to home page</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Notfound;
