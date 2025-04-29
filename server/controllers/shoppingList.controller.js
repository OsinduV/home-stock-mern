import ShoppingList from "../models/shoppingList.model.js";
import { errorHandler } from "../utils/error.js";

// Get all shopping list items for a user
export const getShoppingList = async (req, res, next) => {
    try {
      // Check if user is authenticated
      if (!req.user || !req.user._id) {
        return next(errorHandler(400, "User ID is required"));
      }
      
      console.log("Fetching shopping list for user:", req.user._id);
      
      const shoppingList = await ShoppingList.find({ addedBy: req.user._id })
        .sort({ order: 1, createdAt: -1 })
        .populate("addedBy", "username");
      
      console.log("Found shopping list items:", shoppingList.length);
      
      res.status(200).json({
        success: true,
        data: shoppingList,
      });
    } catch (error) {
      console.error("Error fetching shopping list:", error);
      return next(errorHandler(500, "Error fetching shopping list"));
    }
  };
  
  

// Add a new item to shopping list
export const addShoppingListItem = async (req, res, next) => {
    try {
      const { itemName, category, quantity, priority, addedBy } = req.body;
  
      // Validate required fields
      if (!itemName || !category || !quantity) {
        return next(errorHandler(400, "Please provide all required fields"));
      }
  
      // Use addedBy from request body or fall back to authenticated user
      const userId = addedBy || req.user._id;
      
      if (!userId) {
        return next(errorHandler(400, "User ID is required"));
      }
  
      // Get the highest order value to place new item at the end
      const highestOrder = await ShoppingList.findOne({ addedBy: userId })
        .sort({ order: -1 })
        .select("order");
      
      const newOrder = highestOrder ? highestOrder.order + 1 : 0;
  
      const newItem = new ShoppingList({
        itemName,
        category,
        quantity,
        priority: priority || "Medium",
        addedBy: userId,
        order: newOrder,
      });
  
      await newItem.save();
  
      res.status(201).json({
        success: true,
        data: newItem,
        message: "Item added to shopping list",
      });
    } catch (error) {
      console.error("Error adding shopping list item:", error);
      return next(errorHandler(500, "Error adding item to shopping list"));
    }
  };
  

// Update a shopping list item
export const updateShoppingListItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { itemName, category, quantity, priority, status } = req.body;

    const item = await ShoppingList.findById(id);

    if (!item) {
      return next(errorHandler(404, "Item not found"));
    }

    // Check if the item belongs to the user
    if (item.addedBy.toString() !== req.user._id.toString()) {
      return next(errorHandler(403, "You can only update your own items"));
    }

    const updatedItem = await ShoppingList.findByIdAndUpdate(
      id,
      {
        itemName,
        category,
        quantity,
        priority,
        status: status !== undefined ? status : item.status,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedItem,
      message: "Item updated successfully",
    });
  } catch (error) {
    console.error("Error updating shopping list item:", error);
    return next(errorHandler(500, "Error updating shopping list item"));
  }
};

// Delete a shopping list item
export const deleteShoppingListItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await ShoppingList.findById(id);

    if (!item) {
      return next(errorHandler(404, "Item not found"));
    }

    // Check if the item belongs to the user
    if (item.addedBy.toString() !== req.user._id.toString()) {
      return next(errorHandler(403, "You can only delete your own items"));
    }

    await ShoppingList.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting shopping list item:", error);
    return next(errorHandler(500, "Error deleting shopping list item"));
  }
};

// Update item order (for drag and drop functionality)
export const updateItemOrder = async (req, res, next) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return next(errorHandler(400, "Invalid items data"));
    }

    // Update each item's order in a transaction
    const bulkOps = items.map(item => ({
      updateOne: {
        filter: { _id: item.id, addedBy: req.user._id },
        update: { $set: { order: item.order } }
      }
    }));

    await ShoppingList.bulkWrite(bulkOps);

    res.status(200).json({
      success: true,
      message: "Item order updated successfully",
    });
  } catch (error) {
    console.error("Error updating item order:", error);
    return next(errorHandler(500, "Error updating item order"));
  }
};
