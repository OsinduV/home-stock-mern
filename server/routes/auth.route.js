import express from "express";
import {
  signup,
  signin,
  google,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth
} from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();

router.get("/check-auth",verifyToken,checkAuth);
router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google",google);
router.post("/verify-email",verifyEmail);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:token",resetPassword);



export default router;

