import express, { json } from "express"
import { adminRoute } from "./Backend/Routes/adminRoute.js";
import { userRoute } from "./Backend/Routes/userRoute.js";
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from 'cors';

dotenv.config()

const app = express()
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(json())
app.use(cookieParser())
app.use('/', adminRoute)
app.use('/user',userRoute)

const port = process.env.port

app.listen(port, () => {
    console.log("Server running to port ", port);
})

