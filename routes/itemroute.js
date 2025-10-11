import express from 'express';
import { createitem,getitems,getmyitems } from '../controller/itemcontroller.js';
import protect from '../middleware/authmiddleware.js';
const router=express.Router();
router.get("/",protect,getitems);
router.post("/add",protect,createitem);
router.get("/myitems",protect,getmyitems);
export default router;