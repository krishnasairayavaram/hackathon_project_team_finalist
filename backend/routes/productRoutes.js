import express from "express";
import {
    createProduct,
    getProducts,
    searchProducts,
    updateStock
} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createProduct);

router.get("/", getProducts);

router.get("/search", searchProducts);

router.put("/:id/stock", authMiddleware, adminMiddleware, updateStock);

export default router;