import mongoose from "mongoose";
import { User } from "./userModel.js";
import { Restaurant } from "./restaurantModel.js";
import { Menu } from "./menuModel.js";

const oderItemSchema = mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:Restaurant,
    required: true,
  },
  menuId: { 
    type:mongoose.Schema.Types.ObjectId, 
    ref:Menu,
    required: true 
  },
      // Not required we will populate later from itemId using menu table
      // name: { type: String, required: true },
      // price: { type: Number, required: true },
      // quantity: { type: Number, required: true },
      // image: { type: String, required: true },

  quantity:{
    type: Number,
    required:true,
    default:1
  },
  price:{
    type: Number,
    required:true,
  },
  status: {
    type: String,
    enum: [
      "pending",
      "confirmed",
      "preparing",
      "outfordelivery",
      "delivered",
    ],
    default:"pending",
    required: true,
  }
})

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:User,
      required: true,
    },

    orderItems: [oderItemSchema],

    // deliveryDetails: {
    //   name: { type: String, required: true },
    //   email: { type: String, required: true },
    //   address: { type: String, required: true },
    //   contact: { type: Number, required: true },
    // },

    totalAmount:{
        type:Number,
        required:true
    },
  },
  { timestamps: true }
);

export  const Order = mongoose.model('Order' , orderSchema);