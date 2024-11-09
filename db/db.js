import mongoose from "mongoose"

const connectToDb= async()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL)
    }catch(error){
        console.log(error)
    }
}

export default connectToDb