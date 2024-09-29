import mongoose from "mongoose";
import { Restaurant } from "./restaurantModel.js";

const menuSchema = mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    description:{
      type:String,
      required:true
    },
    price:{
      type:Number,
      required:true
    },
    image:{
      type:String,
      required:true
    },
    restaurantId:{
        type:mongoose.Schema.Types.ObjectId,
        // ref:Restaurant,
        required:true
    }
  },{timestamps:true});
  
  export const Menu = mongoose.model("Menu", menuSchema);