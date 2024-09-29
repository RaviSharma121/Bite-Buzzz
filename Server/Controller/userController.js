import { User } from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(201).json({
      message: "Enter all fields",
      sucess: false,
    });
  }

  const userExists = await User.findOne({ email });
  if (!userExists) {
    return res.status(201).json({
      message: "User doesnt exist",
      sucess: false,
    });
  }

  // password matching

  const isPasswordMatched = await bcrypt.compare(password, userExists.password);

  if (!isPasswordMatched) {
    return res.status(401).json({
      message: "Credentials not matched",
      sucess: false,
    });
  }

  const userId = userExists._id;

  const token = jwt.sign({userId} , process.env.jwtSecret , {expiresIn:'1d'});
  res.cookie('token' , token);

  return res.status(200).json({
    message: "Login successfully",
    sucess: true,
    token
  });
};

export const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    return res.status(201).json({
      message: "Enter all fields",
      sucess: false,
    });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(201).json({
      message: "User already exists with this id",
      sucess: false,
    });
  }

  // password hashing

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json({
    message: "User Successfully Registered",
    sucess: true,
  });
};



export const logout = (req,res) =>{
    res.clearCookie('token');
    return res.status(200).json({
        message: "Logged out successfully",
        success: true
    });
}