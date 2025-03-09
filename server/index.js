import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
<<<<<<< HEAD
import cookieParser from "cookie-parser";
=======
>>>>>>> 6508cca842079c5cb9e6a84203df04743bdcb361
import authRouter from "./routes/auth.route.js"

dotenv.config();
const app=express();

app.use(express.json()); // alows to parse incoming requests:req:body

app.use(cookieParser()); //alow pass incoming cookies

app.use("/api/auth",authRouter);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(5000, () => {
  console.log("Server is running one 5000!");
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
