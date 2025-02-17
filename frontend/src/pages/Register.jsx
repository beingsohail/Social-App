/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");

  const { registerUser, loading } = UserData();

  const navigate = useNavigate();

  const fileChangeHandler = (e) => {
    const uploadedFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadedFile);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(uploadedFile);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("gender", gender);
    formData.append("file", file);

    registerUser(formData, navigate);
  };

  return (
    <>
      {loading ? (
        <h1>Loding...</h1>
      ) : (
        <div className="-z-10 bg-amber-300 w-full h-screen flex justify-center">
          <div className="flex justify-center w-[90%] md:w-[60%] mt-8">
            <div className="-z-0 absolute top-10 md:top-4 ">
              <h1 className="text-4xl md:text-6xl lg:text-8xl text-amber-100 font-extrabold">
                Registration Form
              </h1>
            </div>
            <div className="bg-amber-300 px-8 py-12 z-100 relative md:top-2 p-4 rounded-lg h-[80%] lg:h-[90%] w-[80%] lg:w-[60%] shadow-2xl shadow-amber-700 mt-12">
              <div className="px-2">
                <h2 className="text-3xl text-amber-50 font-bold">
                  Hey new friend,
                </h2>
                <h3 className="text-md  text-green-500 font-bold">
                  Fill the details below to register yourself...
                </h3>

                <div className="mx-auto my-4 min-h-[100%]">
                  <form onSubmit={handleSubmit}>
                    <div className="w-[90%] flex justify-center items-center flex-col mx-auto">
                      <div className="w-full flex flex-col gap-2 sm:flex-row justify-around items-center">
                        <label className="text-gray-100 font-bold">
                          Upload Profile picture:{" "}
                        </label>
                        <input
                          className="w-[10rem] bg-amber-100 text-center rounded-2xl p-2 my-2"
                          type="file"
                          // value={file}
                          onChange={(e) => fileChangeHandler(e)}
                          required
                        />
                        {filePrev && (
                          <img
                            src={filePrev}
                            alt=""
                            className="w-[5rem] h-[5rem] rounded-full"
                          />
                        )}
                      </div>
                      <input
                        className="custom-input"
                        type="text"
                        name="name"
                        id=""
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
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
                      <select
                        className="min-w-[4rem] my-1 border-1 rounded-sm p-1"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                      >
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="flex justify-center mx-auto hover:bg-green-600 my-4 py-2 px-4 text-lg font-extrabold text-cyan-50 bg-green-500 rounded-2xl h-12 items-center border-0 w-[10rem]">
                      <button>Register</button>
                    </div>
                  </form>
                </div>
                <div className="text-center flex justify-center gap-2">
                  <p className="text-amber-50 font-bold">
                    Already a Social user?
                  </p>
                  <Link to={"/login"}>
                    <u className="text-amber-600 font-bold">Login</u>
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

export default Register;
