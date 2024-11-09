import express from "express"
import authMiddleWare from "../middleware/authMiddleware.js"
import { addEmployee, upload, getEmployees, getEmployee, editEmployee, getEmployeesByDeptId} from "../controllers/employeeController.js"

const router= express.Router()

router.get("/", authMiddleWare, getEmployees)
router.post("/add", authMiddleWare, upload.single('image'), addEmployee)
router.get("/:id", authMiddleWare, getEmployee)
router.put("/:id", authMiddleWare, editEmployee)
router.get("/department/:id", authMiddleWare, getEmployeesByDeptId)

export default router