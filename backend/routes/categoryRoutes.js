import express from "express";
import { createCategory, getCategories, getCategoryProducts } from "../controllers/categoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createCategory);

router.get("/", getCategories);
router.get("/:id/products", getCategoryProducts);

export default router;