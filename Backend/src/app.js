import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express();
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5500", "*"],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser());

import userRoute from './routes/user.routes.js'
import todoRoute from './routes/todo.routes.js'

app.use("/api/v1/users", userRoute)
app.use("/api/v1", todoRoute)
export { app } 