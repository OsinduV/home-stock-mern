import mongoose from "mongoose";

const shoppingListSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Dairy", "Meat", "Vegetables", "Fruits", "Bakery", "Beverages", "Snacks", "Canned", "Frozen", "Household", "Other"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: 1,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: Boolean,
      default: false, // false = not purchased, true = purchased
    },
    order: {
      type: Number,
      default: 0, // For drag and drop reordering
    },
  },
  { timestamps: true }
);

const ShoppingList = mongoose.model("ShoppingList", shoppingListSchema);
export default ShoppingList;
