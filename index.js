const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./src/db")
const taskRouter = require("./src/routes/taskRoute")
const userRouter = require("./src/routes/userRoute")


dotenv.config()
connectDB()

const app = express()
app.use(express.json())
app.use(cors())
app.use('/',taskRouter)
app.use('/',userRouter)


const PORT = process.env.PORT

app.get('/',(req,res)=>{
    res.send("hello mern APP")
})

app.listen(PORT,()=>{
    console.log("Server is running in PORT :"+PORT);
})