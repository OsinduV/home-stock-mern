import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { createHome ,sendInvitation,acceptInvitation,getUserHome,editHomeName,deleteHome,getHomeMembers} from "../controllers/user.home.controller.js";
const router = express.Router();


// POST /api/homes/create
router.post("/create",verifyToken, createHome); 

router.get("/my-home", verifyToken, getUserHome);
router.post("/send",verifyToken, sendInvitation);
router.get("/accept/:token", verifyToken,acceptInvitation);

router.put("/edit/:id", verifyToken, editHomeName);
router.delete("/delete/:id",verifyToken, deleteHome);


//get home member using user model

router.get("/members/:homeId", verifyToken, getHomeMembers);

export default router;