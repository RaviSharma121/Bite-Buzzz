import { Menu } from "../Models/menuModel.js";

export const createMenu = async (req,res)=>{
    const {name , description , price,image} = req.body;
    const restaurantId = req.params.id;

    if(!name || !description || !price || !restaurantId ||!image){
        return res.status(201).json({
            message:"Enter all fields",
            success:false
        })
    }
    const menu = await Menu.create({
        name,
        description,
        price,
        image,
        restaurantId
    });

    if(!menu){
        return res.status(201).json({
            message:"Order creation failed",
            success:false
        })
    }

    return res.status(200).json({
        message:"Menu created successfully",
        success:true
    })
}