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
    try{
        const userexist=await User.findOne({email});
        if(userexist){
            return res.status(400).json({message:"user already exists"});
        }
        const salt=bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(password,salt);
        const newuser=await User.create({
            name,
            email,
            password:hashedpassword,
        });
        if(newuser){
            res.status(201).json({
                id:newuser._id,
                name:newuser.name,
                email:newuser.email,
                token:generatejwt(newuser._id),
            });
        }else{
            res.status(400).json({message:"invalid user data"});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    
        }
}
 export const login=async(req,res)=>{
    try{
    const {name,email,password}=req.body;
    const user=await User.findOne({email});
    if(user&&await bcrypt.compare(password,user.password)){
        res.json({
            id:user._id,
            name:user.name,
            email:user.email,
            token:generatejwt(user._id),
        });
    }else{
        res.status(400).json({message:"invalid credentials - user not found! Sign up first"});
    }
    
    }catch(err){
        res.status(500).json({message:err.message});
    }
    
}