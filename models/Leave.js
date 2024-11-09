import mongoose, { Schema } from 'mongoose'

const leaveSchema = new mongoose.Schema({
  employeeId: {type: Schema.Types.ObjectId, ref: 'Employee', required: true},  
  leaveType: {type: String, enum: ['sick', 'casual', 'annual'], required: true,},
  fromDate: {type: Date, required: true,},
  toDate: {type: Date, required: true,},
  description: {type: String, required: true,},
  status: {type: String, enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  appliedAt: {type: Date, default: Date.now,},
  updatedAt: {type: Date, default: Date.now}
});

const Leave = mongoose.model('Leave', leaveSchema);

export default Leave
