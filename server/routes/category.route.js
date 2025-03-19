import { Router } from "express";
import { addCategory, deleteCategory, getallCategory, getCategoryById, updateCategory } from "../controllers/category.controller.js";


const categoryRouter = Router();

categoryRouter.post("/add-category",addCategory);
categoryRouter.get("/all-category",getallCategory);
categoryRouter.get("/all-category/by-id",getCategoryById);
categoryRouter.put('/update-category/:id',updateCategory);
categoryRouter.delete('/delete-category/:id',deleteCategory);


export default categoryRouter;
