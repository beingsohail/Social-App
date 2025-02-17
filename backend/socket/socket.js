import { Server } from "socket.io";

let io;

const onlineUsers = new Map();

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Will update later with frontend URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected : ", socket.id);

    // Listen for user joining
    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log(`User ${userId} is online`);
    });

    // Listen for new messages
    socket.on("sendMessage", ({ chatId, senderId, receiverId, text }) => {
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        socket
          .to(receiverSocketId)
          .emit("newMessage", { chatId, senderId, receiverId, text });
      }
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
      console.log("User disconect: ", socket.id);

      onlineUsers.forEach((val, key) => {
        if (val == socket.id) onlineUsers.delete(key);
      });
    });
  });
};

export { io };
