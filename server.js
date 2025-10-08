import  express  from "express";
import dotenv from "dotenv";
dotenv.config();
import connect from "./mongo/db.js";
connect();

const app=express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("api is runnning");
});
const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log("hi");
    console.log(`server running in this ${PORT}`);
});