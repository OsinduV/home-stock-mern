import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"

dotenv.config();
const app=express();

app.use(express.json()); // alows to parse incoming requests:req:body

app.use(cookieParser()); //alow pass incoming cookies

app.use("/api/auth",authRouter);
app.use("/api/user",userRoutes);

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
