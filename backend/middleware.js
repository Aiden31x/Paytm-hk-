
const jwt=require("jsonwebtoken");
const JWT_SECRET = require("./routes/config");

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    //checks headers 
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({});
    }

    const token=authHeader.split(' ')[1];
//verifies jwt and then moves to the next function which it is suppose to do
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        if(decoded.userId){
            req.userId=decoded.userId;
            next();
        }else{
            return res.status(403).json({});
        }
        
    }catch(err){
        return res.status(403).json({});
    }
};

module.exports={
    authMiddleware
}