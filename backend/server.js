import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";

import Category from "./models/Category.js";
import Product from "./models/Product.js";
import User from "./models/User.js";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const MONGO_URL = process.env.MONGO_URL;

const connectDB = async () => {
  try {

    await mongoose.connect(MONGO_URL);

    console.log("MongoDB connected successfully");

    // Seed default data if DB empty
    const count = await Category.countDocuments();

    if (count === 0) {

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("admin123", salt);

      await User.create({
        name: "Admin User",
        email: "admin@quickbite.com",
        password: hashedPassword,
        role: "admin"
      });

      const categories = await Category.insertMany([
        { name: "Deals", icon: "🔥" },
        { name: "Burgers", icon: "🍔" },
        { name: "Chicken", icon: "🍗" },
        { name: "Beverages", icon: "🥤" },
        { name: "Desserts", icon: "🍦" },
        { name: "Sides", icon: "🍟" },
        { name: "Combos", icon: "🍱" }
      ]);

      const burgersId = categories.find(c => c.name === "Burgers")._id;
      const chickenId = categories.find(c => c.name === "Chicken")._id;

      await Product.insertMany([
        {
          title: "Double Cheese Burger",
          price: 5.99,
          imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
          description: "Two 100% beef patties with cheese and sauce.",
          category: burgersId,
          stock: 100
        },
        {
          title: "Spicy Chicken Sandwich",
          price: 4.99,
          imageUrl: "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
          description: "Crispy chicken with spicy mayo.",
          category: chickenId,
          stock: 50
        }
      ]);

      console.log("Database seeded successfully");

    }

  } catch (error) {
    console.error("Database connection failed:", error);
  }
};

connectDB();

app.get("/", (req, res) => {
  res.send("Backend API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});