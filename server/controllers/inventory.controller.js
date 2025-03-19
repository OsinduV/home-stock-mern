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


export const deleteInventory = (req,res,next)=>{
    const id = req.body.id;
    Inventory.deleteOne({id:id})
    .then(response=>{
        res.json({
            msg:"Inventory is deleted!",
        })
    })
    .catch(error=>{
        res.json({error})
    })
};

export const updateInventory = (req,res)=>{
    const {id,name,category,quantity,price,supplier,description,createdAt,updatedAt} = req.body;
    Inventory.updateOne({id:id},{$set:{name:name,category:category,quantity:quantity,price:price,supplier:supplier,description:description,
                                         createdAt:createdAt,updatedAt:updatedAt
    }})
    .then(response=>{
        res.json({
            msg:"Inventory is updated!!",
        })
    })
    .catch(error=>{
        res.json({error})
    })
    
}
