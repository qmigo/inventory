require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
const jobsRouter = require('./routes/jobs')
const authRouter = require('./routes/auth')
const errorHandlerMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
const connectDB = require('./db/connect')
const authenticateUser = require('./middleware/auth')

// security package
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');


const port = process.env.PORT||3000

app.set('trust proxy', 1)
app.use(
    rateLimiter({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
        })
    )
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/jobs',authenticateUser,jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log('Connection to db successfull')
            console.log(`Server running at http://localhost:${port}`)
        })
    } catch (error) {
        console.log(error);
    }
}

start()