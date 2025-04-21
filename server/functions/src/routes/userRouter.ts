import express from "express"
import { getUserProfile, saveUserProfile } from "../controllers/users"
import checkAuth from "../middleware/auth"


const router = express.Router()

router.get("/profile", checkAuth, getUserProfile)
router.post("/profile", checkAuth, saveUserProfile)

export default router