var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const checkUser= function(req,res,next)  {
    const token = req.headers.authorization.split(" ")[1];
    if(token) {
        jwt.verify(token,JWT_SECRET,(err,payload)=>{
            if(err){
                res.status(403).json("token invalid")
            }else{
                req.user = payload;
                next();
                
            }
        })
    }else{
        res.status(403).json(" you are not authenticated please logged in") 
    }
}

module.exports = {checkUser}

