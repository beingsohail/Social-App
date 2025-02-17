import { Op } from "sequelize";
import Chat from "../models/chat.js";
import User from "../models/user.js";

export const accessChat = async (req, res) => {
  try {
    const { userId } = req.body; // This will be receiver's ID
    const senderId = req.user.id; // Logged in user (Sender)

    if (!userId)
      return res.status(400).json({ message: "User ID is required" });

    const chat = await Chat.findOne({
      where: {
        [Op.or]: [
          { senderId, receiverId: userId },
          { senderId: userId, receiverId: senderId },
        ],
      },
    });

    if (!chat) chat = await Chat.create({ senderId, receiverId: userId });
    res.status(200).json(chat);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

export const fetchChats = async (req, res) => {
  try {
    const senderId = req.user.id; // SenderID

    const chats = await Chat.findAll({
      where: {
        [Op.or]: [{ senderId }, { receiverId: senderId }],
      },
      include: [
        { model: User, as: "sender", attributes: ["id", "name"] },
        { model: User, as: "receiver", attributes: ["id", "name"] },
      ],
    });

    // Include the latest message in the response
    const chatWithLatestMessages = chats.map((chat) => ({
      ...chat.toJSON(),
      latestMessage: chat.latestMessage,
      latestMessageSender: chat.latestMessageSender,
    }));

    res.status(200).json(chatWithLatestMessages);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};
