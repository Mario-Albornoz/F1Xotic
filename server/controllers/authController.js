import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Secret for JWT found in .env

// REGISTER a new user
export const register = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: "User already exists" });

        user = new User({ username, password });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// LOGIN user
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// GET current user (Protected Route)
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Does not return password in the response
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
