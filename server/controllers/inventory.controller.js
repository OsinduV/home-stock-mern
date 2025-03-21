//import { inventoryInfo } from "../data/product-Info.js";
import { response } from "express";
import Inventory from "../models/inventory.model.js";




export const addInventoryItem =  async(req, res,next) => {
    const {name,category,quantity,price,supplier,description,createdAt} = req.body;

    if(!name || !category || !quantity || !price || !supplier || !description ||!createdAt || name==="" || category==="" || quantity==="" || 
        price==="" || supplier==="" || description==="" || createdAt==="")
        {
            return res.status(400),
                   res.json({
                    msg:"All fields are required!"
                   });
        }

    
      const newInventory = Inventory({
        name,
        category,
        quantity,
        price,
        supplier,
        description,
        createdAt
      });
      
      try{
      await newInventory.save();
      res.status(400),
      res.json({
        msg:"successfully Inventory added!"
      })
    }
    catch(error){
       next(error);

    };
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

export const getInventoryById = (req, res) => {
    try {
        const { id } = req.query; // If it's a query param
        // const { id } = req.params; // Uncomment if using path params

        if (!id) {
            return res.status(400).json({ msg: "ID is required" });
        }

        // if (!Inventory || !Array.isArray(Inventory)) {
        //     return res.status(500).json({ msg: "Inventory data is missing or incorrect" });
        // }

        const item = Inventory.find(i => i.id == id);

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
    const { name, category, quantity, price, supplier, description, createdAt, updatedAt } = req.body; // Get new data from request body

    try {
        const updatedInventory = await Inventory.findByIdAndUpdate(
            id, 
            { name:name}, 
            {category:category}, 
            {quantity:quantity}, 
            {price:price},
            {supplier:supplier},
            {description:description},
            {createdAt:createdAt},
            {updatedAt:updatedAt}, // Update only the provided fields
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



export const deleteInventory = async(req,res)=>{
    const {id} = req.params;
   try{
    const deletedInventory = await Inventory.findByIdAndDelete(id);

    if (!deletedInventory) {
        return res.status(404).json({ msg: "Inventory not found!" });
    }
    res.json({ msg: "Inventory deleted successfully!" });
   }
   catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
}
};

