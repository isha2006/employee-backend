import express from "express"
import authMiddleWare from "../middleware/authMiddleware.js"
import { addLeave, getLeave, getLeaves, getLeaveDetail, changeStatus} from "../controllers/leaveController.js"


const router= express.Router()

router.post("/add", authMiddleWare, addLeave)
router.get("/detail/:id", authMiddleWare, getLeaveDetail)
router.get("/:id/:role", authMiddleWare, getLeave)
router.put("/:id", authMiddleWare, changeStatus)
router.get("/", authMiddleWare, getLeaves)

export default router