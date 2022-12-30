// import cors from 'cors'
import 'express-async-errors'
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

//db and auth user
import connectDB from './db/connect.js';

// routers
import authRouter from './route/authRoute.js'
import jobRouter from './route/jobRoute.js'

//middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

// app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/job', jobRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`)
        })
        
    } catch(error) {
        console.log(error)
    }
}

start()