import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST || "127.0.0.1",
  port: process.env.DB_PORT || 5432, // Added port
  dialect: process.env.DB_DIALECT || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  logging: false,
});

const connect_to_database = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to database...");
  } catch (error) {
    console.error("❌ Database connection error:", error);
  }
};

export default sequelize;
export { connect_to_database };
