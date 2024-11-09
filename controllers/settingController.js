import User from "../models/User.js"
import bcrypt from "bcrypt"

const changePassword = async (req, res) => {
    try {
        const {userId, oldPassword, newPassword} = req.body
        const user= await User.findById({_id: userId})
        if(!user){
            return res.status(404).json({success: false, message: "User not found"})
        }
        const isMatch= await bcrypt.compare(oldPassword, user.password)
        if(!isMatch){
            return res.status(400).json({success: false, message: "Wrong Password"})
        }
        const newPswd= await bcrypt.hash(newPassword, 10)
        
        const newUser = await User.findByIdAndUpdate({_id: userId},{password: newPswd})
        res.status(200).json({ success: true, message:"Password Changed"})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export { changePassword }