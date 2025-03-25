import express from "express";


import { authMiddleware } from "../middleware/authMiddleware.js";
import { createOrderItem, getOrderItems } from "../controllers/orderItemController.js";
import { deleteOrderItem } from "../../client/src/api/api.js";


const router = express.Router();


//ORDER ITEMS ROUTES 
router.get("/", authMiddleware, getOrderItems)
router.post("/create", authMiddleware, createOrderItem)
router.delete("/:id", authMiddleware, deleteOrderItem)

export default router;