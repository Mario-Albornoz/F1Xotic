import express from "express";


import { authMiddleware } from "../middleware/authMiddleware.js";
import { getOrders, createOrder } from "../controllers/orderController.js";

const router = express.Router();

//ORDER ROUTES

router.get("/", authMiddleware, getOrders)
router.post("/create", authMiddleware, createOrder)

export default router