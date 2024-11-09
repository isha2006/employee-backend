import Leave from "../models/Leave.js"
import Employee from "../models/Employee.js"

const addLeave = async (req, res) => {
    try {
        const {userId, leaveType, fromDate, toDate, description} = req.body
        const employee = await Employee.findOne({userId})

        const newLeave= new Leave({
            employeeId: employee._id, leaveType, fromDate, toDate, description
        })
        await newLeave.save()

        res.status(200).json({ success: true, message:"Leave added"})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getLeave= async(req, res)=>{
    try{
        const {id, role}=req.params;
        let leave 
        if(role === "admin"){
            leave= await Leave.find({employeeId: id})
        }else{
            const employee= await Employee.findOne({userId: id})
            leave= await Leave.find({employeeId: employee._id})
        }
        return res.status(200).json({success: true, leave})
    }catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}

const getLeaves= async(req, res)=>{
    try{
        const leaves= await Leave.find().populate({
            path: "employeeId",
            populate:[
                {
                    path: "department",
                    select: "dep_name"
                },
                {
                    path: "userId",
                    select: "name"
                }
            ]
        })
        return res.status(200).json({success: true, leaves})
    }catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}

const getLeaveDetail= async(req, res)=>{
    try{
        const {id}= req.params
        const leave= await Leave.findById({_id: id}).populate({
            path: "employeeId",
            populate:[
                {
                    path: "department",
                    select: "dep_name"
                },
                {
                    path: "userId",
                    select: "name profileImg"
                }
            ]
        })
        return res.status(200).json({success: true, leave})
    }catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}

const changeStatus= async(req, res)=>{
    try{
        const {id}=req.params;
        const leave= await Leave.findByIdAndUpdate({_id: id}, {status: req.body.status})
        if(!leave){
            return res.status(404).json({success: false, message:"Leave not found"})
        }
        return res.status(200).json({success: true, leave})
    }catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}

export { addLeave, getLeave, getLeaves, getLeaveDetail, changeStatus}