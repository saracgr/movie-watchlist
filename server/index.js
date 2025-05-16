import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import userModel from './models/User.js'
import bcrypt from 'bcrypt'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ['https://the-moviewatchlist.netlify.app', 'http://localhost:5174'],
    credentials: true
}))

const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB sucessfully connectec')
    }
    catch(err){
        console.error('MongoDB connection error:', err.message);
        process.exit(1)
    }
};

connectMongoDB();

app.post('/signup', async (req, res) => {
     const {username, password} = req.body
    try{
        const existingUser = await userModel.findOne({username})
        if(existingUser){
            return res.status(400).json({msg: 'Username already exists'})
     }
     const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({username, password: hashedPassword})
    res.json(user)
    }catch(err){
        res.json(err)
    } 
})

app.post('/login', async (req, res) => {
    const {username, password} = req.body
    try{
        const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
     const token = jwt.sign({ username },process.env.JWT_SECRET, {expiresIn: '2h'} )
     res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 3600000
     });
     res.json({ msg: 'Loged in sucessfully'})
    }catch(err){
        res.json(err)
    }
})



  app.get('/', (req, res) => {
    res.send('API is running')
  }) 

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log('Server is running')
})