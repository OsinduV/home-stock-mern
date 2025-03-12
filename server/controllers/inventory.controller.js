import { inventoryInfo } from "../data/product-Info.js";
import Inventory from "../models/inventory.model.js";



export const addInventoryItem =  (req, res) => {
    try {
       // const newItem = new Inventory(req.body);
        //await newItem.save();

        res.status(200).json({
            msg: "Item is successfully added!",
            //item: newItem
        });
    } catch (error) {
        res.status(500).json({
            msg: "Some error!",
            error: error.message
        });
    }
};

export const getallInventry = (req,res)=>{
    try{
        console.log(req);
         
        res.status(200);
        res.json({
            msg:"All item are displayed!",
            data:inventoryInfo
        })

    }
    catch{
        res.json(400);
        res.json({
            msg:"Some error happen!",
            error:error.message
        })

    }
};
export const getinventoryById = (req,res)=>{
    try{
        const {id} = req.query;
        if(id!==undefined){
            const inventory = inventoryInfo.find(i=>i.id===Number(id))
            
            res.status(200)
            res.json({
                msg:"your inventry",
                data:inventory
            })
        }
    }
    catch{
           
           res.status(400)
           res.json({
            msg:"some inventry error happen!"
           })
    }

};