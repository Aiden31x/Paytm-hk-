const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://aryandadwal2004:rK8uk5jA8s78Lh7O@cluster0.oi7abgn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

//Schema for the Users
const userSchema= new mongoose.Schema({
    userName:{
        type: String,
        required: true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    password:{
        type: String,
        required: true,
        minLength:3
    },
    firstName:{
        type: String,
        required: true,
        trim:true,
        maxLength:30
    },
    lastName:{
        type: String,
        required: true,
        trim:true,
        maxLength:30
    },
    balance: {
        type: Number,
        required: true,
        default: 0 // Or any value you prefer
    }
})

//defingin schema for the account 

const accountSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,               //reference to user model
        ref:'User',
        required: true
        
    },
    balance: {
        type:Number,
        required: true
    }
});
//creating a model from the Schema
const User=mongoose.model("User",userSchema);
const Account=mongoose.model("Account",accountSchema);

module.exports={
    User,
    Account,
}