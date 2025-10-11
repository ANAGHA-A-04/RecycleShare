import Item from "../model/item.js";
export const createitem=async(req,res)=>{
    try{
        const{title,description,price,quantity,image}=req.body;
        const item=await Item.create({
            title,
            description,
            price,
            quantity,
            image,
            owner:req.user._id,
        });
        res.status(201).json(item);
    }catch(err){
        res.send(500).json({message:err.message});
    }
        
    };
  export const getitens=async(req,res)=>{
    try{
        const items=await Item.find({status:"available"}).populate("owner","name email");
        res.json(items);
        
    }catch(err){
        res.status(500).json({message:err.message});
    }
  };
  export const getmyitems= async(req,res)=>{
    try{
const items=await Item.find({owner:req.owner._id});
res.json(items);
    }catch(err){
     res.status(500).json({message:err.message});
    }
  }

