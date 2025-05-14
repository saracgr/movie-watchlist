import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import userModel from './models/User.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB sucessfully connectec')
    }catch(err){
        console.error('MongoDB connection error:', err.message);
        process.exit(1)

    }
};

connectMongoDB();

app.post('/register', (req, res) => {
    const {username, password} = req.body
    userModel.create({username, password})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})



  app.get('/', (req, res) => {
    res.send('API is running')
  }) 

 


const PORT = process.env.PORT || 3001


app.listen(PORT, () => {
    console.log('Server is running')
})