import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  getAllMessages,
  sendMessage,
} from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/:chatId", isAuth, getAllMessages);
messageRouter.post("/", isAuth, sendMessage);

export default messageRouter;
