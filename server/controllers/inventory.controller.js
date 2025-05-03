//import { inventoryInfo } from "../data/product-Info.js";
import Inventory from "../models/inventory.model.js";

export const addInventoryItem = async (req, res, next) => {
  try {
    const { name, category, quantity, price, supplier, description } = req.body;

    if (
      !name ||
      !category ||
      !quantity ||
      !price ||
      !supplier ||
      !description
    ) {
      return (
        res.status(400),
        res.json({
          msg: "All fields are required!",
        })
      );
    }

    const newInventory = new Inventory({
      name,
      category,
      quantity,
      price,
      supplier,
      description,
    });

    if (!newInventory) {
      return res.status(400).json({ msg: "Error for adding data." });
    }

    await newInventory.save();
    res.status(200),
      res.json({
        msg: "successfully Inventory added!",
      });
  } catch (error) {
    next(error);
  }
};

export const getallInventry = async (req, res, next) => {
  try {
    const item = await Inventory.find();

    res.json({
      msg: "All the inventories are displayed!",
      data: item, // Include the retrieved data
    });
  } catch (error) {
    res.status(400).json({
      msg: "Some error happened!",
      error: error.message,
    });
  }
};

export const getInventoryById = async (req, res) => {
  try {
    const id = req.params.id; // If it's a query param
    // const { id } = req.params; // Uncomment if using path params

    if (!id) {
      return res.status(400).json({ msg: "ID is required" });
    }

    // if (!Inventory || !Array.isArray(Inventory)) {
    //     return res.status(500).json({ msg: "Inventory data is missing or incorrect" });
    // }

    const item = await Inventory.findById(id);

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    return res.status(200).json({ data: item });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return res.status(500).json({ msg: "Some inventory error happened!" });
  }
};

export const updateInventory = async (req, res) => {
  const { id } = req.params; // Get ID from URL params
  const {
    name,
    category,
    quantity,
    price,
    supplier,
    description,
    createdAt,
    updatedAt,
  } = req.body; // Get new data from request body

  // Input validation
  if (!name || !category || !quantity || !price || !supplier) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  // Ensure quantity and price are valid numbers
  if (isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ msg: "Quantity must be a positive number" });
  }

  if (isNaN(price) || price <= 0) {
    return res.status(400).json({ msg: "Price must be a positive number" });
  }

  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(
      id,
      {
        name,
        category,
        quantity,
        price,
        supplier,
        description,
        createdAt,
        updatedAt,
      }, // Pass all fields as a single object
      { new: true } // Return the updated document
    );

    if (!updatedInventory) {
      return res.status(404).json({ msg: "Inventory item not found!" });
    }

    res.json({ msg: "Inventory updated successfully!", updatedInventory });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

export const deleteInventory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedInventory = await Inventory.findByIdAndDelete(id);

    if (!deletedInventory) {
      return res.status(404).json({ msg: "Inventory not found!" });
    }
    res.json({ msg: "Inventory deleted successfully!" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

export const addMultipleInventoryItems = async (req, res, next) => {
  try {
    const items = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ msg: "No items to insert" });
    }

    const formattedItems = items.map((item) => ({
      name: item.itemname,
      category: item.category,
      quantity: item.quantity,
      price: item.price,
      supplier: item.supplier || "Unknown",
      description: item.description || "Scanned from receipt",
    }));

    await Inventory.insertMany(formattedItems);

    res.status(201).json({ msg: "Items added successfully!" });
  } catch (error) {
    next(error);
  }
};
