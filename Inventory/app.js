require('express-async-errors')
require('dotenv').config() 
const cors = require('cors')
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const router = require('./routes/main')
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use('/api/v1',router)

const start = async()=>{
    await connectDB(process.env.MONGO_URI)
    app.listen(port, ()=> console.log(`Running at http://localhost:${port}`))
}

start()