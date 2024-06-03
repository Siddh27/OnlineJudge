import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

const corsOptions = {
    origin: 'http://localhost:5173', // Frontend origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  };
  
app.use(cors(corsOptions));

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(express.static("public"))

app.use(cookieParser())

import userRouter from './routes/user.routes.js'

// routes declaration
app.use("/api/v1/users",userRouter) // this will support all the routes of users


export {app}