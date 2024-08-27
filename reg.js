let mongoose=require("mongoose");
let signupschema=new mongoose.Schema({
    name: {
     type: String,
        required:true,
    },
    email:{
      type:  String,
      required:true,
    },
    password:{
       type: String,
       required:true,
    },
    phonenumber:
    {
      type:  Number,
        required:true,
    },
    
    address:{
       type: String,
        required:true,
    }
})
module.exports=mongoose.model("signup",signupschema);