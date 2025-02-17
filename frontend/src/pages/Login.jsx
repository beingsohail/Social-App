/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, loading } = UserData();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password, navigate);
    console.log("Clicked");
  };

  return (
    <>
      {loading ? (
        <h1>Loding</h1>
      ) : (
        <div className="-z-10 bg-amber-300 w-full h-screen flex justify-center">
          <div className="flex justify-center w-[90%] md:w-[60%] mt-8">
            <div className="-z-0 absolute top-10 md:top-4 ">
              <h1 className="text-4xl md:text-6xl lg:text-8xl text-amber-100 font-extrabold">
                Login Form
              </h1>
            </div>
            <div className="bg-amber-300 px-8 py-12 z-100 relative md:top-2 p-4 rounded-lg max-h-[60%] lg:max-h-[70%] w-[80%] lg:w-[60%] shadow-2xl shadow-amber-700 mt-12">
              <div className="p-2 my-2">
                <h2 className="text-3xl text-amber-50 font-bold">
                  Hey social friend,
                </h2>
                <h3 className="text-md  text-amber-50 font-bold">
                  Fill the details below to log in...
                </h3>

                <div className="mx-auto my-4 min-h-[100%]">
                  <form onSubmit={handleSubmit}>
                    <div className="w-[90%] flex justify-center items-center flex-col mx-auto">
                      <input
                        className="custom-input"
                        type="email"
                        name="email"
                        id=""
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <input
                        className="custom-input"
                        type="password"
                        name="password"
                        id=""
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex justify-center mx-auto my-4 py-2 px-4 text-lg font-extrabold text-cyan-50 bg-green-400 rounded-2xl h-12 items-center border-0 w-[10rem]">
                      <button>Login</button>
                    </div>
                  </form>
                </div>
                <div className="text-center flex justify-center gap-2">
                  <p className="text-amber-50 font-bold">
                    New user to Social?{" "}
                  </p>
                  <Link to={"/register"}>
                    <u className="text-amber-600 font-bold"> Register</u>
                  </Link>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
