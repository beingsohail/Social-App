/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Account() {
  const { user, loading, fetchUser } = UserData();
  const navigate = useNavigate();
  const { logoutUser } = UserData();

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  function handleLogout() {
    logoutUser(navigate);
  }

  return (
    <>
      {user && user.user ? (
        <div className="flex flex-col md:flex-row gap-4 items-center w-[90%] mx-auto rounded-2xl mt-4 px-8 md:px-24 py-4 md:py-8 bg-slate-400">
          <div className="flex min-w-fit gap-4 justify-between">
            <div className="flex">
              <img
                src={user.user.profilePic_url || ""}
                alt="Profile Picture"
                className="w-[120px] h-[120px] rounded-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-bold text-2xl text-cyan-900">
                {user.user.name}
              </h2>
              <p className="font-medium italic text-gray-600">
                {user.user.email}
              </p>
              <div className="flex flex-row gap-4">
                <p className="font-semibold text-blue-950">
                  Followers : {user.followers}
                </p>
                <p className="font-semibold text-blue-950">
                  Followings : {user.followings}
                </p>
              </div>
            </div>
          </div>

          <div className="flex md:w-[60%] md:justify-end">
            <button
              onClick={handleLogout}
              className="w-[6rem] px-6 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 hover:cursor-pointer font-bold text-white"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="">
          <h1>404 User not found</h1>
        </div>
      )}
    </>
  );
}

export default Account;
