/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loginUser(email, password, navigate) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/login", {
        email,
        password,
        navigate,
      });

      toast.success(data.message);
      setIsAuth(true);
      setUser(data.user);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  }

  async function registerUser(formdata, navigate) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/register", formdata);

      toast.success(data.message);
      setIsAuth(true);
      setUser(data.user);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  }

  async function fetchUser() {
    try {
      const { data } = await axios.get("/api/user/myprofile");
      setUser({
        user: data.user,
        followers: data.followers || 0,
        followings: data.followings || 0,
      });
      console.log("Hey Sohail, here : ", data);

      setIsAuth(true);
    } catch (error) {
      console.error(error.message);
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  }

  async function logoutUser(navigate) {
    try {
      const { data } = await axios.post("/api/auth/logout");

      if (data.message) {
        toast.success(data.message);
        setUser(null);
        setIsAuth(false);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loginUser,
        user,
        setUser,
        isAuth,
        setIsAuth,
        loading,
        logoutUser,
        registerUser,
        fetchUser,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
