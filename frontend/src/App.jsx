/* eslint-disable no-unused-vars */

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserData } from "./context/UserContext.jsx";
import Account from "./pages/Account.jsx";
import Navbar from "./components/Navbar.jsx";
import Notfound from "./pages/Notfound.jsx";
import Header from "./components/Header.jsx";
import Reels from "./pages/Reels.jsx";

function App() {
  const { user, isAuth, loading } = UserData();

  return (
    <>
      {loading ? (
        <h1 className="text-3xl text-amber-300">Loading...</h1>
      ) : (
        <BrowserRouter>
          {isAuth && <Header />}
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            <Route path="/reels" element={isAuth ? <Reels /> : <Login />} />
            <Route
              path="/account"
              element={isAuth ? <Account user={user} /> : <Login />}
            />
            <Route path="/login" element={!isAuth ? <Login /> : <Home />} />
            <Route
              path="/register"
              element={!isAuth ? <Register /> : <Home />}
            />
            <Route path="*" element={<Notfound />} />
          </Routes>
          {isAuth && <Navbar />}
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
