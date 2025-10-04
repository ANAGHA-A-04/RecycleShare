import User from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import dotenv from "dotenv";
dotenv.config();
const generatejwt=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"356d"});
}
export const signup= async(req,res)=>{
    const {name,email,password}=req.body;
}