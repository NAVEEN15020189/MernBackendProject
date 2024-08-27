let mongoose=require("mongoose");
let signupschema=new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    phonenumber:Number,
    address:String
})
module.exports=mongoose.model("signup",signupschema);