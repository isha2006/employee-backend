import express from "express"
import authMiddleWare from "../middleware/authMiddleware.js"
import { addDepartment, getDepartments, getDepartment, editDepartment, deleteDepartment} from "../controllers/departmentController.js"

const router= express.Router()

router.get("/", authMiddleWare, getDepartments)
router.post("/add", authMiddleWare, addDepartment)
router.get("/:id", authMiddleWare, getDepartment)
router.put("/:id", authMiddleWare, editDepartment)
router.delete("/:id", authMiddleWare, deleteDepartment)

export default router