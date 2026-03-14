import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import StockHistory from "../models/StockHistory.js";

export const createOrder = async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        const { items } = req.body;

        if (!items || items.length === 0) {
            throw new Error("Order must contain at least one item");
        }

        let totalPrice = 0;

        for (const item of items) {

            const product = await Product.findById(item.product).session(session);

            if (!product) {
                throw new Error("Product not found");
            }

            if (product.stock < item.quantity) {
                throw new Error(`Not enough stock for ${product.title}`);
            }

            // Calculate total price
            totalPrice += product.price * item.quantity;

            // Reduce stock
            product.stock -= item.quantity;

            await product.save({ session });

            // Save stock history
            await StockHistory.create(
                [{
                    product: product._id,
                    changeType: "decrease",
                    quantityChanged: item.quantity,
                    reason: "Order placed"
                }],
                { session }
            );

        }

        const order = new Order({
            user: req.user.id,
            items,
            totalPrice
        });

        await order.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: "Order created successfully",
            order
        });

    } catch (error) {

        await session.abortTransaction();
        session.endSession();

        res.status(500).json({
            message: error.message
        });

    }

};

export const getOrderHistory = async (req, res) => {

    try {

        const orders = await Order.find({ user: req.user.id })
            .populate("items.product");

        res.status(200).json(orders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};