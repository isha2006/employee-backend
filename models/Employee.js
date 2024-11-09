import mongoose, { Schema } from "mongoose"

const employeeSchema= new mongoose.Schema({
    userId:{type: Schema.Types.ObjectId, ref:"User", required: true},
    employeeId: {type: String, required: true, unique: true},
    gender: {type: String},
    designation: {type: String},
    salary: {type: Number, required: true},
    dob: {type: Date},
    maritalStatus: {type: String},
    department: {type: Schema.Types.ObjectId, ref:"Department", required: true},
    createdAt:{type: Date, default: Date.now},
    updatedAt:{type: Date, default: Date.now}
})

const Employee= mongoose.model("Employee", employeeSchema)

export default Employee