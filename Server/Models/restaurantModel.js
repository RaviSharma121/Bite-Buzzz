import mongoose from "mongoose";
import {User} from "./userModel.js";

const restaurantSchema  = mongoose.Schema({
    restaurantName : {
        type: String ,
        required: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required: true
    },
    cuisines:{
        type: [{
            type:String,
            required:true
        }],
        required:true
    }

} , {timestamps:true})

export const Restaurant = mongoose.model('Restaurant' , restaurantSchema);