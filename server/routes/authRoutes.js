import express from "express";
import { check } from "express-validator";
import { register, login, getUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register Route
router.post(
    "/register",
    [check("username", "Username is required").not().isEmpty(), check("password", "Password must be at least 6 characters").isLength({ min: 6 })],
    register
);

// Login Route
router.post("/login", login);

// Get Current User Route (Protected)
router.get("/user", authMiddleware, getUser);

export default router;
