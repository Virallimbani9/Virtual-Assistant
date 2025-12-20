import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { getToken } from "../config/token.js";

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Basic validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name: firstName + " " + lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    const token = await getToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false,
    });
    await newUser.save();
    res.status(201).json({
      data: {
        token,
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      message: "User Created Successfully",
    });
  } catch (err) {
    console.error("Error during sign up:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = await getToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({
      token,
      message: "Logged in successfully",
    });
  } catch (err) {
    console.error("Error during log in:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const logOut = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};
