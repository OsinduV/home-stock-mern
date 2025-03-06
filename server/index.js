import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRouter from "./routes/auth.route.js"
dotenv.config();
const app=express();

app.use(express.json());


app.use("/api/auth",authRouter);



mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to Mongodb");
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(5000, () => {
  console.log("Server is running one 5000!!!");
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
