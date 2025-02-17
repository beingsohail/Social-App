import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.js";

const Follow = sequelize.define(
  "Follow",
  {
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    timestamps: true,
  }
);

// Self-referencing Many-to-Many Relationship
User.belongsToMany(User, {
  through: Follow,
  as: "Followers", // Users who follow this user
  foreignKey: "followingId",
});

User.belongsToMany(User, {
  through: Follow,
  as: "Following", // Users this user follows
  foreignKey: "followerId",
});

export default Follow;
