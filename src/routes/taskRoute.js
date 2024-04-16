const express = require("express")
const TaskModel = require("../models/taskModel")
const UserModel = require("../models/userModels")
const authToken = require("../verifyToken")

const taskRouter  = express.Router()

taskRouter.post('/api/addTask',authToken,async(req,res)=>{
    try {
        const {title,description} = req.body
        const userId = req.user.id
        const user = await UserModel.find({_id:userId})
        const newtask = new TaskModel({title,description,completeTasK:false,userId})
        newtask.save()
        res.send({message:"todo task added"})
    } catch (error) {
        console.log("Error in adding Task"+error)
        res.send({message:"Error in adding Task"})
    }
})

taskRouter.get('/api/getTask',authToken,(req,res)=>{
        TaskModel.find({userId : req.user.id})
        .then(task => res.json(task))
        .catch(err => res.send({message:"error getting task" +err}))
})

taskRouter.delete('/api/deleteTask',authToken,async(req,res)=>{
    try {
        const {id} = req.body
        await TaskModel.findByIdAndDelete(id)
        res.send({message:"task deleted"})
    } catch (error) {
        res.send({message:"error in task deleting"})
        console.log("error in task deleting", error);
    }
})

module.exports = taskRouter