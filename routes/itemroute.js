import express from 'express';
import { createitem,getitems,getmyitems, borrowitem, updateitem, deleteitem } from '../controller/itemcontroller.js';
import protect from '../middleware/authmiddleware.js';
const router=express.Router();
router.get("/",protect,getitems);
router.post("/add",protect,createitem);
router.get("/myitems",protect,getmyitems);
// additional item actions
router.post("/:id/borrow", protect, borrowitem);
router.put("/:id", protect, updateitem);
router.delete("/:id", protect, deleteitem);

export default router;