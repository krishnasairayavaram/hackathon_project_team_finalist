import express from "express";
import { createOrder, getOrderHistory } from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createOrder);

router.get("/history", authMiddleware, getOrderHistory);

export default router;