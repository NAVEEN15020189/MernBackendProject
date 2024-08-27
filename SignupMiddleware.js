let jwt=require("jsonwebtoken");
let SignupMiddleware=(req,res,next)=>{
    let token =req.header("x-token");
    if(!token){
        res.send("<h1> Token not Found</h1>")
    }
   let decode =jwt.verify(token,"jwtSecure")
   req.user1= decode.user1;
   next()

}

module.exports=SignupMiddleware;