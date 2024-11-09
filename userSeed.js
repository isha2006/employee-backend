import User from "./models/User.js"
import bcrypt from "bcrypt"
import connectToDb from "./db/db.js"

const userRegister= async()=>{
    connectToDb()
    try{
        const hashPswd= await bcrypt.hash("admin",10)
        const newUser= new User({
            name:"Admin",
            email:"admin@gmail.com",
            password:hashPswd,
            role:"admin"
        })
        await newUser.save()
    }catch(error){
        console.log(error)
    }
}

export { userRegister }