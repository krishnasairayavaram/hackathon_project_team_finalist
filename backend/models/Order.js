import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
{
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
        default: 1,
    }
}
);

const OrderSchema = new mongoose.Schema(
{
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    items: [OrderItemSchema],

    totalPrice: {
        type: Number,
        required: true,
    },

    orderStatus: {
        type: String,
        enum: ["pending", "confirmed", "delivered"],
        default: "pending",
    }
},
{
    timestamps: true
}
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;