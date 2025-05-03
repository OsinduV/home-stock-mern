import express from "express";
import {
  signout,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} from "../controllers/user.controller.js";


import { verifyToken } from "../utils/verifyToken.js";



const router = express.Router();




router.put("/update/:id",verifyToken,updateUser);

router.delete("/delete/:id",verifyToken,deleteUser);



router.get("/getusers", verifyToken,getUsers);

router.post('/signout', signout);

// router.get('/:id',verifyToken,getUser);


export default router;
