import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authController.js";
import uploadFile from "../middlewares/multer.js";

const authRouter = express.Router();

authRouter.post("/register", uploadFile, registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser);

export default authRouter;
