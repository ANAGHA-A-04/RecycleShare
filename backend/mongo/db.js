import mongoose from "mongoose";
const connect= async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URL,{
            
});
    console.log("mongodbconnected");


    }
    catch(error){
        console.error(`there is an error${error.message}`);
    }
}
export default connect;