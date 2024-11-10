import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
const secretkey = process.env.secretkey

const authenticate = (req,res,next)=>{
    const cookies = req.headers.cookie
    const cooki = cookies.split(';')
    for(const cookie of cooki){
        const [name,token] = cookie.trim().split("=")
        if(name == 'authToken'){
            const verified = jwt.verify(token,secretkey)
            console.log("verified : ",verified);
            req.username = verified.username
            req.Role = verified.Role
            // console.log(req.username,req.Role);
                       
            break           
        }
    }
    next()
}

export {authenticate}