import Follow from "../models/follow.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import getDataUrl from "../utils/urlGenerator.js";
import { v2 } from "cloudinary";

export const myProfile = async (req, res) => {
  try {
    console.log("In myProfile request function : ", req.user);

    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });

    // My Original code
    // const followersCount = await Follow.count({
    //   where: { followingId: req.user.id },
    // });
    // const followingsCount = await Follow.count({
    //   where: { followerId: req.user.id },
    // });

    // Chat GPT Code
    // Fetch followers & followings in parallel
    const [followersCount, followingsCount] = await Promise.all([
      Follow.count({ where: { followingId: req.user.id } }),
      Follow.count({ where: { followerId: req.user.id } }),
    ]);

    res.json({
      user,
      followers: followersCount,
      followings: followingsCount,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const userProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    console.log("The User : " + user);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const followUser = async (req, res) => {
  try {
    const { id: followingId } = req.params;
    const { id: followerId } = req.user;

    console.log(req.user);

    if (parseInt(followerId) === parseInt(followingId)) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const existingFollow = await Follow.findOne({
      where: { followerId, followingId },
    });

    if (existingFollow) {
      return res
        .status(400)
        .json({ message: "You are already following this user" });
    }

    await Follow.create({ followerId, followingId });

    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const unFollowUser = async (req, res) => {
  try {
    const { id: followingId } = req.params;
    const { id: followerId } = req.user;

    if (parseInt(followerId) === parseInt(followingId))
      return res.status(400).json("You cannot unfollow yourself.");

    const follow = await Follow.findOne({
      where: { followerId, followingId },
    });

    if (!follow) return res.status(404).json("You do not follow this user.");

    console.log(follow);

    await follow.destroy().then(() => {
      res.status(200).json({
        message: "Unfollowed successfully.",
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFollowersList = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      include: [
        {
          model: User,
          as: "Followers",
          attributes: ["id", "name", "email"],
          through: { attributes: [] }, // Exclude Follow table fields
        },
      ],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ followers: user.Followers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFollowingsList = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      include: [
        {
          model: User,
          as: "Following",
          attributes: ["id", "name", "email"],
          through: { attributes: [] }, // Exclude Follow table fields
        },
      ],
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ followers: user.Following });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userFollowersAndFollowings = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id, {
      include: [
        {
          model: User,
          as: "Followers",
          attributes: ["id", "name", "email"],
          through: { attributes: [] },
        },
        {
          model: User,
          as: "Following",
          attributes: ["id", "name", "email"],
          through: { attributes: [] },
        },
      ],
    });

    // console.log(id);

    if (!user) res.status(404).json({ message: "User did not found" });

    res.status(200).json({
      followers: user.Followers,
      following: user.Following,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    console.log(user);

    const { oldPassword, newPassword } = req.body;

    const comparePassword = await bcrypt.compare(oldPassword, user.password);

    if (!comparePassword) {
      return res.status(400).json({
        message: "Wrong Password",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password updated successfully.", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = req.user;

    const { name } = req.body;
    const file = req.file;

    if (name) {
      user.name = name;
    }

    if (file) {
      const fileUrl = getDataUrl(file);

      // Deleting old file and its ID
      await v2.uploader.destroy(user.profilePic_id);
      await v2.uploader.destroy(user.profilePic_url);

      // Saving New File and its ID
      const myCloud = await v2.uploader.upload(fileUrl.content);
      user.profilePic_id = myCloud.public_id;
      user.profilePic_url = myCloud.secure_url;
    }

    await user.save();

    res.status(200).json({ message: "Profile Updated Successfully.", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
