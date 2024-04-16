const express = require("express")
const bcrypt  = require("bcrypt")
const jwt  = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const UserModel = require("../models/userModels")
const authToken = require("../verifyToken")

const userRouter  = express.Router()

const generateToken = (id) =>{
    return jwt.sign(
        {id},
        process.env.PRIVATE_KEY,
        {expiresIn : "20m"}
    )
}

// user registration : 

userRouter.post('/api/register',async(req,res)=>{
    try {
        const {name,email,password} = req.body
        const emailExists = await  UserModel.findOne({email})
        if(emailExists){
            return res.send({message : "User already exists"})
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            const newUser = new UserModel({name,email,password:hashedPassword})
            const user = await newUser.save()
            const token = generateToken(user._id)
            res.send({user,token})
        }
    } catch (error) {
        res.send({message : "Error creating User"})
        console.log("Error in Registering User "+error);
    }
})

// userLogin : 

userRouter.post('/api/login',async(req,res)=>{
    
    try {
        const {email,password} = req.body
        const user = await UserModel.findOne({email})
        if(!user){
            return res.send({message:"User not found"})
        }
        const compare = await bcrypt.compare(password,user.password)
            if(!compare){
                return res.send({message:"Invalid email or password"})
            }
                const token = generateToken(user._id)
                res.send({user,token})
        

    } catch (error) {
        res.send({message : "Error login"})
        console.log("Error login"+error);  
    }
})

// get selected user

userRouter.get('/api/user/:id',authToken,async(req,res)=>{
    try {
        const  id = req.params.id
        const user = await UserModel.find({_id:id})
        res.send({user})
    } catch (error) {
        res.send({message : "Error Getting User"})
        console.log("Error Getting User"+error);  
    }
})

module.exports = userRouter