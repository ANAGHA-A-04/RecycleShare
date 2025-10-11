import jwt from "jsonwebtoken";
import User from "../user/user.js";
const protect=async(req,res,next)=>{
    let token;
    
    console.log("Authorization header:", req.headers.authorization);
    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token=req.headers.authorization.split(" ")[1];
            console.log("Extracted token:", token);
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decoded.id).select("-password");
            next();
        }catch(err){
            console.log("JWT verification error:", err.message);
            return res.status(401).json({message:"Not authorized, token failed"});
        }
    } else {
        console.log("No valid authorization header found");
        return res.status(401).json({message:"Not authorized, no token provided"});
    }
};
export default protect;