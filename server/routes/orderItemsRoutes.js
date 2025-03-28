import express from "express";


import { authMiddleware } from "../middleware/authMiddleware.js";
import { createOrderItem, getOrderItems, removeOrderItem } from "../controllers/orderItemController.js";



const router = express.Router();


//ORDER ITEMS ROUTES 
router.get("/", authMiddleware, getOrderItems)
router.post("/create", authMiddleware, createOrderItem)
router.delete("/:id", authMiddleware, removeOrderItem)

export default router;