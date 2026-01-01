import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})
import { app } from './app.js'
import { DB_NAME } from './constants.js'
import mongoose from 'mongoose'
import connectDB from './db/index.js'
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log("server started")
        })
    })
    .catch((err) => { 
        console.group('not connected')
    })