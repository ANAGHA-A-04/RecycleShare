import mongoose from "mongoose";
const itemschema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please add a title"],
    },
    description:{
        type:String,
        required:[true,"please add a description"],
    },
    price:{
        type:Number,
        required:[true,"please add a price"],

    },
    quantity:{
        type:Number,
        required:[true,"please add a quantity"],
    },
    image:{
        type:String,
        required:[true,"please add an image"],
    },
    status:{
        type:String,
        enum:["available","borrowed","requested"],
        default:"available",

    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    borrowedby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null,
    }

},
{timestamps:true});
const Item=mongoose.model("Item",itemschema);
export default Item;