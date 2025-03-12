import { Router } from "express";
import { inventoryInfo } from "../data/product-Info.js";

const productRouter = Router();

productRouter.get('/all-products',(req,res)=>{
    console.log(req);
    res.status(200)
    res.json({
        msg:"all-inventory-items",
        data:inventoryInfo,
    })
})

export default productRouter;