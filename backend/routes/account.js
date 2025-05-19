const express= require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");


const accountRouter=express.Router();


//retrieves balance
accountRouter.get("/balance",authMiddleware,async (req,res)=>{
    const account=await Account.findOne({
        userId:req.userId
    });

    res.json({
        balance:account.balance
    })
});



//transfering money using transaction in databases
accountRouter.post("/transfer",authMiddleware,async(req,res)=>{
    const session=await mongoose.startSession();  //defining a session

    session.startTransaction(); //starting a session
    const {amount,to}=req.body;
//finidng the account sending the money
    const account=await Account.findOne({userId:req.userId}).session(session);


    //checks blance
    if(!account|| account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient balance"
        });
    }
//finding the acount which will receive the money
    const toAccount=await Account.findOne({userId:to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        });
    }




    //transaction logic 

    //debit
    await Account.updateOne({
        userId:req.userId
    },{$inc: {balance:-amount}}).session(session);


    //credit
    await Account.updateOne({
        userId:req.userId
    },{$inc:{balance:amount}}).session(session);

    //commiting th etransaction becuase wont work without our transaction in db is comiited
    await session.commitTransaction();
    res.json({
        message:"Transaction completed successfully "
    });
});

module.exports=accountRouter;