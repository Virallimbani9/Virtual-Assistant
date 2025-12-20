import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB  from './config/db.js'
import cookieParser from 'cookie-parser'
import userRouter from './routers/user.routes.js'
const app = express()

connectDB()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(express.json())
app.use(express.json({ extended: false }));
app.use(cookieParser())

app.use('/api/users', userRouter);


app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))