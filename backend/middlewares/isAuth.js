import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(403).json({ message: "Unauthorized" });

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedData) return res.status(400).json({ message: "Token Expired" });

    req.user = await User.findByPk(decodedData.id || decodedData._id);

    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
