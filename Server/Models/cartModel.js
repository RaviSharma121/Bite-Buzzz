import mongoose from "mongoose";
import { User } from "./userModel.js";
import { Restaurant } from "./restaurantModel.js";
import { Menu } from "./menuModel.js";

const cartSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    cartItems:[
        {
            menuId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:Menu,
                required:true
            },
            restaurantId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:Restaurant,
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                default:1
            },
            price:{
                type:Number,
                required:true
            }
        }
    ]
  },{timestamps:true});
  
  export const Cart = mongoose.model("Cart", cartSchema);