import User from "../models/user.model.js"; 
import bcrypt from "bcryptjs";
import { getToken } from "../config/token.js";

export const signUp = async (req, res) => {
    try{
        const { name, email, password } = req.body;

        // Basic validation
        if(!name || !email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }

        if(password.length < 6){
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });
        if(existingUser){
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email: email.toLowerCase(),
            password:hashedPassword
        });
        const token = await getToken(newUser._id);

        res.cookies('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch(err){
        console.error("Error during sign up:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}