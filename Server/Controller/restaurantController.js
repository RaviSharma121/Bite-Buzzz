import mongoose from "mongoose";
import { Restaurant } from "../Models/restaurantModel.js";

export const createRestaurant = async (req,res)=>{
    const {restaurantName , country , city , cuisines} = req.body;

    if(!restaurantName || !country || !city || !cuisines){
        return res.status(201).json({
            message:"Enter all fields",
            success: false
        })
    }

    const restaurantExists = await Restaurant.findOne({restaurantName});
    if(restaurantExists){
        return res.status(201).json({
            message:"Restaurant with this name already exists",
            success:false
        })
    }
    const userId = req.id;
    const newRestaurant = await Restaurant.create({
        restaurantName,
        createdBy:userId,
        country,
        city,
        cuisines
    })
    if(!newRestaurant){
        return res.status(201).json({
            message:"Creation failed",
            success:false
        })
    }

    return res.status(200).json({
        message:"Restaurant created successfuly",
        success:true
    })
}

export const getRestaurant =async (req,res)=>{
    const allRestaurants =await Restaurant.find();
    if(!allRestaurants){
        return res.status(201).json({
            message:"No restaurants found",
            success:false
        })
    }

    return res.status(200).json({
        success:true,
        allRestaurants
    })
}