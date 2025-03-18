import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js"
import userRoutes from "./routes/user.route.js"
import cors from "cors"
import productRouter from "./routes/products.route.js";
import reportRouter from "./routes/reports.route.js";


dotenv.config();
const app=express();

// Allow all origins
app.use(cors());
//app.use(cors({origin:"http://localhost:5173",credentials:true}));

app.use(express.json()); // alows to parse incoming requests:req:body

app.use(cookieParser()); //alow pass incoming cookies

app.use("/api/auth",authRouter);
app.use("/api/user",userRoutes);

//Routes MIddleware
app.use("/api/v1/products",productRouter);
app.use("/api/reports",reportRouter)

app.use((err,req,res,next) =>{
  const statusCode = err.statusCode || 500;
  const message = err.message || "internel server error";
  res.status(statusCode).json({
    sucess:false,
    statusCode,
    message,
  })
})

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(5000,()=>{
  console.log("server is running on port 5000!");
})
