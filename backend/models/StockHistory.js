import mongoose from "mongoose";

const StockHistorySchema = new mongoose.Schema(
{
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },

    changeType: {
        type: String,
        enum: ["increase", "decrease"],
        required: true,
    },

    quantityChanged: {
        type: Number,
        required: true,
    },

    reason: {
        type: String,
        required: false,
    }
},
{
    timestamps: true
}
);

const StockHistory = mongoose.model("StockHistory", StockHistorySchema);

export default StockHistory;