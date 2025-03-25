import express from "express";
import { 
    createProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    searchProductsByName,
    updateProduct, 
} from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; 

const router = express.Router();

// CRUD Routes for Products
router.get("/", getAllProducts)
router.get("/search", searchProductsByName);
router.post("/create", authMiddleware, createProduct);
router.get("/:id", getProductById) // get single product by id
router.patch("/:id", authMiddleware, updateProduct)
router.delete("/:id",authMiddleware, deleteProduct)



export default router;