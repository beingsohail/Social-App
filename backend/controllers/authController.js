import User from "../models/user.js";
import generateToken from "../utils/tokenGenerator.js";
import getDataUrl from "../utils/urlGenerator.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";

export const registerUser = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { name, email, password, gender } = req.body;
    console.log(name, email, password, gender);

    if (!name || !email || !password || !gender) {
      return res.status(400).json({
        message: "Please give all the details",
      });
    }
    const file = req.file; // The uploaded file will be in req.file

    if (!file) {
      return res.status(400).json({
        message: "Please upload a file",
      });
    }

    let user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({
        message: `A user already exist with email : ${email}`,
      });
    }

    const fileUrl = getDataUrl(file);
    const hashPassword = await bcrypt.hash(password, 10);

    const myCloud = await cloudinary.v2.uploader.upload(fileUrl.content);

    user = await User.create({
      name,
      email,
      password: hashPassword,
      gender,
      profilePic_id: myCloud.public_id,
      profilePic_url: myCloud.secure_url,
    });

    generateToken(user.id, res);

    res.status(201).json({
      message: "User Registered",
      user,
    });
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        message:
          "Could not able to find the user. Please check the credentials.",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    generateToken(user.id, res);

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.json({
      message: "User Logged out successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
