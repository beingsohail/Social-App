import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Post from "./post.js";
import User from "./user.js";

const Like = sequelize.define("Like", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
    onDelete: "CASCADE",
  },
});

User.belongsToMany(Post, {
  through: Like,
  foreignKey: "userId",
  as: "likedPosts",
});
Post.belongsToMany(User, {
  through: Like,
  foreignKey: "postId",
  as: "likedBy",
});

export default Like;
