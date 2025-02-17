import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";

// Importing Routes
import userRouter from "./routes/userRoutes.js";
import authRouter from "./routes/authRoutes.js";
import postRouter from "./routes/postRoutes.js";
import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";

// Importing Sequelize configurations
import { connect_to_database } from "./config/database.js";
import sequelize from "./config/database.js";

// Importing Database Models
import "./models/user.js";
import "./models/follow.js";
import "./models/post.js";
import "./models/comment.js";
import "./models/like.js";

// Importing socket logic
import { initializeSocket } from "./socket/socket.js";
import { createServer } from "http";
import User from "./models/user.js";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.Cloudinary_Name,
  api_key: process.env.Cloudinary_API,
  api_secret: process.env.Cloudinary_Secret,
});

const PORT = process.env.port || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/api/user/allUsers", async (req, res) => {
  try {
    const users = await User.findAll();
    console.log(users);

    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
  }
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/chat", chatRouter);
app.use("/api/messages", messageRouter);

// Applying socket server with backend server
const server = createServer(app);
initializeSocket(server);

const startServer = async () => {
  try {
    await connect_to_database();
    await sequelize.sync({ alter: true }).then(() => {
      console.log("Database structure is updated without any errors.");
    });
  } catch (error) {
    console.error("Something went wrong...");
  }
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
  });
};

startServer();
