import Department from "../models/Department.js"

const getDepartments= async(req, res)=>{
    try{
        const departments= await Department.find()
        return res.status(200).json({success: true, departments})
    }catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}

const addDepartment= async(req, res)=>{
    try{
        const{dep_name, description}= req.body
        const newDep= new Department({
            dep_name,
            description
        })
        await newDep.save()
        res.status(200).json({success:true, department: newDep})
    }catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}

const getDepartment= async(req, res)=>{
    try{
        const {id}=req.params;
        const department= await Department.findById({_id:id})
        return res.status(200).json({success: true, department})
    }catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}

const editDepartment= async(req, res)=>{
    try{
        const {id}=req.params;
        const{dep_name, description}= req.body
        const editDep= await Department.findByIdAndUpdate({_id:id}, {
            dep_name,
            description
        })
        res.status(200).json({success:true, editDep})
    }catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}

const deleteDepartment= async(req, res)=>{
    try{
        const {id}=req.params;
        const deleteDep= await Department.findById({_id:id})
        await deleteDep.deleteOne()
        res.status(200).json({success:true, deleteDep})
    }catch(error){
        res.status(500).json({success:false, message:error.message})
    }
}

export {addDepartment, getDepartments, getDepartment, editDepartment, deleteDepartment}