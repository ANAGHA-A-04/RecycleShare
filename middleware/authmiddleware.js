import jwt from "jsonwebtoken";
import User from "../model/user.js";
const protect=async(req,res,next)=>{
    let token;
    if(req.header.authorization && req.header.authorization.startWith("Bearer")){
        try{
            token=req.header.authorization.split("")[1];
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decoded.id).select("-password");
            next();
        }catch(err){
            console.log(err);
            res.status(401).json({message:"not authorization,token failed"});

        }
    }
    if(!tokan){
        res.status(401).json({message:"not authorized,token failed"});
    }
};
export default protect;