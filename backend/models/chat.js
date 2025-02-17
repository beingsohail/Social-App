import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import User from "./user.js";

const Chat = sequelize.define("Chat", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  latestMessage: {
    // New field to track the latest message
    type: DataTypes.STRING, // You can store the latest message text
    allowNull: true,
  },
  latestMessageSender: {
    // You can store the ID of the sender of the latest message
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

Chat.belongsTo(User, { foreignKey: "senderId", as: "sender" });
Chat.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });

export default Chat;
