import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"

import ocrRoutes from "./routes/ocr.route.js"

import shoppingListRoutes from "./routes/shoppingList.route.js";

import cors from "cors"
import productRouter from "./routes/products.route.js";
import reportRouter from "./routes/reports.route.js";
import categoryRouter from "./routes/category.route.js";


const app = express();

const app = express();

dotenv.config();
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Your frontend URL
    credentials: true, // Allow cookies and authentication headers
  })
);


// app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(express.json()); // allows to parse incoming requests:req:body

app.use(cookieParser()); // allow pass incoming cookies

app.use("/api/auth",authRouter);
app.use("/api/user",userRoutes);
app.use("/api/ocr",ocrRoutes);
app.use("/api/shopping-list", shoppingListRoutes);


//Routes MIddleware
app.use("/api/v1/products",productRouter);
app.use("/api/reports",reportRouter)
app.use("/api/v1/category",categoryRouter)

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected!!!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log("Server is running on 5000!!!!");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

