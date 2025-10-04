import mongoose from "mongoose";
const userschema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"please add a name"],
        },
        email:{
            type:String,
            required:[true,"please add an email"],
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
            unique:true,
        },
        password:{
            type:String,
            required:[true,"please enter password"],
            minlength:6


        },
    },
    {timestamps:true}
);
const User = mongoose.model("User",userschema);
export default User;
