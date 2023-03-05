const mongoose = require('mongoose')

const connectDB = async(uri)=>{
    mongoose.set('strictQuery', false)
    return await mongoose.connect(uri)
} 

module.exports = connectDB