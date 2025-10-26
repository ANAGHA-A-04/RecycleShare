import Item from "../user/items.js";
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
        res.status(500).json({message:err.message});
    }
        
    };
  export const getitems=async(req,res)=>{
    try{
        const items=await Item.find({status:"available"}).populate("owner","name email");
        res.json(items);
        
    }catch(err){
        res.status(500).json({message:err.message});
    }
  };
  export const getmyitems= async(req,res)=>{
    try{
const items=await Item.find({owner:req.user._id});
res.json(items);
    }catch(err){
     res.status(500).json({message:err.message});
    }
  };
  export const borrowitem=async(req,res)=>{
    try{
        const item= await Item.findById(req.params.id);
        if(!item){
             return res.status(404).json({message:"item not found"});
        }
        if(item.status!=="available"){
            return res.status(400).json({message:"items not available"});

        }
        // mark as borrowed and set borrower
        item.status="borrowed";
        item.borrowedby=req.user._id;
        await item.save();
        res.json({message:"item borrowed successfully",item});  

    }catch(err){
        res.status(500).json({message:err.message});
    }
  };
  export const updateitem=async(req,res)=>{
    try{
        const item =await Item.findById(req.params.id);
        if(!item){
            return res.status(404).json({message:"item not found"});

        }
        if(item.owner.toString()!==req.user._id.toString()){
            return res.status(401).json({message:"not authorized to update this item"});
        }
         const updatedItem =await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true, runValidators:true}
         );
         res.json(updatedItem);

    }catch(err){
        res.status(500).json({message:err.message});

    }
  }
  export const deleteitem= async(req,res)=>{
    try{
        const item = await Item.findById(req.params.id);
        if(!item){
             return res.status(404).json({message:"item not found"});
        }
        if(item.owner.toString()!==req.user._id.toString()){
            return res.status(401).json({message:"not authorized to delete this item"});
        }
        await item.deleteOne();
        res.json({message:"item deleted successfully"});
    } catch(err){
        res.status(500).json({message:err.message});
    }
  }
