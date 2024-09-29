import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    },
    phone :{
        type:Number,
        required:true
    },
    admin :{
        type:Boolean,
        default:false
    },
},{timestamps:true});

export const User = mongoose.model('User' , userSchema);

