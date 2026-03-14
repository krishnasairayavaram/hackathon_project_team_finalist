import Product from "../models/Product.js";

export const createProduct = async (req, res) => {

    try {

        const { title, description, price, taxPercentage, imageUrl, category, stock } = req.body;

        const product = new Product({
            title,
            description,
            price,
            taxPercentage,
            imageUrl,
            category,
            stock
        });

        await product.save();

        res.status(201).json(product);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};

export const getProducts = async (req, res) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const products = await Product.find()
            .populate("category")
            .skip(skip)
            .limit(limit);

        const totalProducts = await Product.countDocuments();

        res.status(200).json({
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts: totalProducts,
            products: products
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const updateStock = async (req, res) => {

    try {

        const { stock } = req.body;

        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        product.stock = stock;

        await product.save();

        res.json(product);

    } catch (error) {

        res.status(500).json({ message: error.message });

    }

};

export const searchProducts = async (req, res) => {
    try {

        const { query } = req.query;

        const products = await Product.find({
            title: { $regex: query, $options: "i" }
        }).populate("category");

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};