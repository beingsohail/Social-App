import dotenv from "dotenv";

dotenv.config();

export default {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "Sohail123",
    database: process.env.DB_NAME || "FinalSocialDB",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "postgres",
  },
};
