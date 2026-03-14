import mongoose from "mongoose";
import dotenv from "dotenv";
import Category from "./models/Category.js";
import Product from "./models/Product.js";

dotenv.config();

const seedData = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected");

    await Category.deleteMany();
    await Product.deleteMany();

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
        description: "Two 100% beef patties with cheese.",
        category: burgersId,
        stock: 100
      },
      {
        title: "Spicy Chicken Sandwich",
        price: 4.99,
        imageUrl: "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
        description: "Crispy chicken sandwich.",
        category: chickenId,
        stock: 50
      }
    ]);

    console.log("Seed data inserted successfully");

    process.exit();

  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedData();