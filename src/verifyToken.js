const jwt  = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const authToken = async(req,res,next) =>{
   const {auth}  = req.headers
   if(!auth){
    return res.send({message:"unauthorised access"})
   }
   const token = auth.split(" ")[1]+ ""
   try {
    const userToken = token.verify(token,process.env.PRIVATE_KEY)
    req.user= userToken
    req.token = token
    next()
   } catch (error) {
    res.send({message:error})
   }
}

module.exports = authToken