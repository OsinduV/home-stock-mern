import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        category_id:{
            type: Number,
            required: [true, "Item name is required"],
            trim: true,
            unique:[true]
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