import express from 'express'
import dotEnv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'


const app = express()
dotEnv.config()

// who can call this server
const allowedDomains = process.env.DOMAINS?.split(',') || []
app.use(cors({
    origin:(origin, callBack) =>{
        if(!origin || allowedDomains.includes(origin)) return callBack(null, true)
        else return callBack(new Error("Not allowed by CORS"))
    },
    methods:['GET', 'POST', 'PUT', 'PATCH','DELETE'],
    credentials:true
}))



// connect with DataBase
const connectDB = async () => {
    try{
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.DB_URI)
        console.log('Done')
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }

}
connectDB()


// 
app.use(express.json())
app.use(cookieParser())


// routes

app.get('/', (req,res) => {
    return res.status(200).json({message:"server is running"})
})


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server is running...`))
