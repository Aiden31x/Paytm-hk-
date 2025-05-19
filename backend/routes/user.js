const express=require("express");
const zod=require("zod");
const jwt=require("jsonwebtoken");
const JWT_SECRET=require("./config");
const { User } = require("../db");
const { authMiddleware } = require("../middleware");

const userRouter=express.Router();

//signup route

//zod schema
const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
});

//signup endpoint
userRouter.post("/signup", async (req, res) => {
    const body = req.body;

    //checking value of the schema 
    const { success } = signupSchema.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    //checks if existing user exists or not
    const existingUser = await User.findOne({
        username: body.username
    });

    if (existingUser) {
        return res.status(411).json({
            message: "Username already taken"
        });
    }

    // Assign a random balance between 1 and 1000
    const randomBalance = Math.floor(Math.random() * 1000) + 1;
    
    // Add balance to the user body
    const userWithBalance = { ...body, balance: randomBalance };

    //creates the User
    const dbUser = await User.create(userWithBalance);

    //creates the jsonwebtoken and as its secret is given it cannot be decoded without it 
    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET);

    //after creation of token shows it 
    res.json({
        message: "User Created Successfully",
        token: token,
        balance: dbUser.balance
    });
});





//signin schema
const signinSchema=zod.object({
    username:zod.string().email(),
    password:zod.string()
})

//signin endpoint
userRouter.post("/signin",async(req,res)=>{

    //checks input matches schema
    const {success}=signinSchema.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    //checks input credentials with the db
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });
    //returns token and value if value is in db
    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
        

})

//updating the user details

const updateBody=zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

userRouter.put("/",authMiddleware,async(req,res)=>{
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
        //updates the user's details
		await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})


//getting values of other users from the database

userRouter.get("/bulk",async (req,res)=>{
    const filter=req.query.filter || "";
    const users= await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            }
        },{
            lastName:{
                "$regex":filter
            }
        }]
    })

    res.json({
        user: users.map(user=>({
            username:user.userName,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})



module.exports=userRouter;