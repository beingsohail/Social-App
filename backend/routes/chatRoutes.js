import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { accessChat, fetchChats } from "../controllers/chatController.js";

const chatRouter = Router();

chatRouter.post("/", isAuth, accessChat);
chatRouter.get("/", isAuth, fetchChats);

export default chatRouter;
