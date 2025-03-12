import { Router } from "express";
import { addInventoryItem, getallInventry, getinventoryById } from "../controllers/inventory.controller.js";

const productRouter = Router();

// productRouter.get('/all-products', (req, res) => {
//     res.status(200).json({
//         msg: "all-inventory-items",
//         data: inventoryInfo,
//     });
// });

// productRouter.get('/by-id', (req, res) => {
//     const { id } = req.query;
//     if (id !== undefined) {
//         const inventory = inventoryInfo.find(i=>i.id===Number(id))
//         return res.status(200).json({
//             msg: "your inventory",
//             data: inventory, // Corrected variable name
//         });
//     }
//     return res.status(400).json({
//         msg: "some error!",
//         data: null
//     });
// });

productRouter.post("/add",addInventoryItem);
productRouter.get("/all-inventry",getallInventry);
productRouter.get("/all-inventry/by-id",getinventoryById)


export default productRouter;
