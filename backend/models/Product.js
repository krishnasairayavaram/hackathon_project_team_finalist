import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
{
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    taxPercentage: {
        type: Number,
        required: true,
        default: 0,
    },

    imageUrl: {
        type: String,
        required: false,
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },

    stock: {
        type: Number,
        required: true,
        default: 0,
    }
},
{
    timestamps: true
}
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;