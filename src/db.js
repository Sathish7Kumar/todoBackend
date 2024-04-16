const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config()

const connectDB  = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB)
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log('DB Connection Error' + error);
    }
}

module.exports = connectDB