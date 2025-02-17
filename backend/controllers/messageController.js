import Chat from "../models/chat.js";
import Message from "../models/message.js";
import User from "../models/user.js";
import { io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { text, chatId } = req.body;

    const senderId = req.user.id;

    if (!chatId || !text)
      return res
        .status(400)
        .json({ message: "Chat ID or message text is missing." });

    const chat = await Chat.findOne({ where: { id: chatId } });

    if (!chat)
      return res.status(404).json({ message: "No chat found for Chat ID" });

    if (senderId !== chat.senderId && senderId !== chat.receiverId)
      return res.status(403).json({ message: "You are not part of this chat" });

    const message = await Message.create({
      chatId,
      text,
      senderId,
    });

    await chat.update({
      latestMessage: text, // Update latest message text
      latestMessageSender: senderId, // Update sender of the latest message
    });

    const receiverId =
      chat.senderId === senderId ? chat.receiverId : chat.senderId;

    io.emit("newMessage", { chatId, senderId, receiverId, text });

    res
      .status(201)
      .json({ message: "message sent successfully.", messageData: message });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.findAll({
      where: { chatId },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: User,
          as: "sender",
          attributes: ["id", "name"], // Include sender details
        },
      ],
    });

    res
      .status(200)
      .json({ message: "All looks good with the messages front.", messages });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong.", error: error.message });
  }
};
