import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN // this is from where your backend can accept requests (frontend), 
}))

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(express.static("public"))

app.use(cookieParser())

import userRouter from './routes/user.routes.js'

// routes declaration
app.use("/api/v1/users",userRouter) // this will support all the routes of users


export {app}