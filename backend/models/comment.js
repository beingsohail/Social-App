import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Post from "./post.js";
import User from "./user.js";

const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
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

User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Post.hasMany(Comment, { foreignKey: "postId", as: "postComments" });
Comment.belongsTo(User, { foreignKey: "userId", as: "commentedBy" });
Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });

export default Comment;
