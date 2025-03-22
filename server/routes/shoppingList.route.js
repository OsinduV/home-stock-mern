import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  getShoppingList,
  addShoppingListItem,
  updateShoppingListItem,
  deleteShoppingListItem,
  updateItemOrder,
} from "../controllers/shoppingList.controller.js";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// Get all shopping list items
router.get("/", getShoppingList);

// Add a new item
router.post("/", addShoppingListItem);

// Update an item
router.put("/:id", updateShoppingListItem);

// Delete an item
router.delete("/:id", deleteShoppingListItem);

// Update item order (for drag and drop)
router.post("/reorder", updateItemOrder);

export default router;
