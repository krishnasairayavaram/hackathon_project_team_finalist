import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true,
    },

    logo: {
        type: String,
        required: false,
    },

    description: {
        type: String,
        required: false,
    }
},
{
    timestamps: true
}
);

const Category = mongoose.model("Category", CategorySchema);

export default Category;