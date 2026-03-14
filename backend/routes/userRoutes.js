import express from "express";
import { makeAdmin } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.put("/make-admin/:id", authMiddleware, adminMiddleware, makeAdmin);

export default router;