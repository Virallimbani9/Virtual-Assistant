import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectDB  from './config/db.js'

const app = express()

connectDB()

app.use(express.json())

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))