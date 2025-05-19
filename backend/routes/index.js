const express=require("express");
const userRouter=require("./user");
const accountRouter = require("./account");

const router=express.Router();
router.use("/user",userRouter);  //now when it gets routed with /api/v1/user it goes to userRouter
router.use("/account",accountRouter); //for account

module.exports=router;