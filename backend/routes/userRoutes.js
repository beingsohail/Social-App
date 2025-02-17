import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  followUser,
  getFollowersList,
  getFollowingsList,
  myProfile,
  unFollowUser,
  updatePassword,
  updateProfile,
  userFollowersAndFollowings,
  userProfile,
} from "../controllers/userController.js";
import uploadFile from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/myprofile", isAuth, myProfile);
userRouter.get("/:id", userProfile);
userRouter.post("/follow/:id", isAuth, followUser);
userRouter.post("/unfollow/:id", isAuth, uploadFile, unFollowUser);
userRouter.get("/followers/:id", getFollowersList);
userRouter.get("/followings/:id", getFollowingsList);
userRouter.get("/userFollowersAndFollowings/:id", userFollowersAndFollowings);
userRouter.put("/updatePassword", isAuth, updatePassword);
userRouter.post("/updateProfile", isAuth, updateProfile);

export default userRouter;
