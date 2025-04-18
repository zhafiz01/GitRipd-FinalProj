// ROUTER FOR USER AUTHENTICATION, IF NEEDED
import express from "express"
import { getUserProfile, getWorkoutPlansByUser, saveUserProfile } from "../controllers/users"
import checkAuth from "../middleware/auth"


const router = express.Router()

router.get("/plans", checkAuth, getWorkoutPlansByUser)
router.get("/profile", checkAuth, getUserProfile)
router.post("/profile", checkAuth, saveUserProfile)

export default router