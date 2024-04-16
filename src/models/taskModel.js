
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title : {type:String, required:true},
    description : {type:String, required:true},
    userID : {type:String, required:true},
    completeTasK :{type:Boolean,required:true}
},{timeStamp : true})

const TaskModel = mongoose.model("TaskInput",taskSchema)

module.exports = TaskModel