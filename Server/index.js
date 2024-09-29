import express from "express";
import dotenv from "dotenv";
import connectDb from "./Utils/db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRoutes from "./Routes/userRoutes.js";
import restaurantRoutes from "./Routes/restaurantRoutes.js";
import menuRoutes from "./Routes/menuRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";
import OrderRoutes from "./Routes/orderRoutes.js";



// middlewares


dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({limit:'10mb'}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// apis 


app.use('/api/v1/user' , userRoutes);
app.use('/api/v1/restaurant' , restaurantRoutes);
app.use('/api/v1/menu' , menuRoutes);
app.use('/api/v1/order' , OrderRoutes);
app.use('/api/v1/cart' ,cartRoutes);


const port = process.env.port||8080;
app.listen(port,()=>{
    connectDb();
    console.log("server running")
});
