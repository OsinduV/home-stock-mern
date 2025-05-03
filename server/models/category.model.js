import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        id:{
            type: Number,
            required: [true, "Item name is required"],
            trim: true,
        },
        category_name:{
            type: String,
            required: [true, "Category is required"],
            trim: true,

        }
    }
);

const Category = mongoose.model("Category",categorySchema);
export default Category;