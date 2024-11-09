import User from "../models/User.js"
import Employee from "../models/Employee.js"
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'

const storage= multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "public/uploads")
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload= multer({storage: storage})

const getEmployees= async(req, res)=>{
    try{
        const employees= await Employee.find().populate('userId', {password: 0}).populate('department')
        return res.status(200).json({success: true, employees})
    }catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}

const addEmployee = async (req, res) => {
    try {
        const {
            name,
            employeeId,
            gender,
            designation,
            salary,
            role,
            email,
            dob,
            maritalStatus,
            department,
            password
        }= req.body

        const user= await User.findOne({email})
        if(user){
            res.status(400).json({success: false, message:"User already exists"})
        }

        const hashPassword= await bcrypt.hash(password, 10)
        const newUser= new User({
            name, email, password: hashPassword, role, profileImg: req.file ? req.file.filename : ""
        })
        const savedUser= await newUser.save()

        const newEmployee= new Employee({
            userId: savedUser._id, employeeId, gender, designation, salary, dob, maritalStatus, department
        })
        await newEmployee.save()
        res.status(200).json({ success: true, message:"Employee created"})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getEmployee= async(req, res)=>{
    try{
        let employee;
        const {id}=req.params;
        employee= await Employee.findById({_id:id}).populate('userId', {password: 0}).populate('department')
        if(!employee){
            employee= await Employee.findOne({userId:id}).populate('userId', {password: 0}).populate('department')
        }
        return res.status(200).json({success: true, employee})
    }catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}

const editEmployee= async(req, res)=>{
    try{
        const {id}=req.params;
        const {
            name,
            designation,
            salary,
            maritalStatus,
            department,
        }= req.body

        const employee= await Employee.findById({_id:id})
        if(!employee){
            return res.status(404).json({success: false, message: "Employee not found"})
        }

        const user= await User.findById({_id: employee.userId})
        if(!user){
            return res.status(404).json({success: false, message: "User not found"})
        }

        const updateUser= await User.findByIdAndUpdate({_id: employee.userId},{name})
        const updateEmployee= await Employee.findByIdAndUpdate({_id:id}, {maritalStatus, designation, department, salary})
        if(!updateUser || !updateEmployee){
            return res.status(404).json({success: false, message: "Doc not found"})
        }
        
        res.status(200).json({success:true, message: "Employee Updated"})
    }catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}

const getEmployeesByDeptId= async(req, res)=>{
    try{
        const {id}=req.params;
        const employees= await Employee.find({department:id})
        return res.status(200).json({success: true, employees})
    }catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}

export { addEmployee, upload, getEmployees, getEmployee, editEmployee, getEmployeesByDeptId}