// ROUTER FOR USER AUTHENTICATION, IF NEEDED
import express from "express"
import { getWorkoutPlansByUser, saveUserProfile } from "../controllers/users"
import { verifyFirebaseToken } from "middleware/auth"

const router = express.Router()

router.get("/api/plans/:userId", getWorkoutPlansByUser)
router.post("/api/profile", verifyFirebaseToken, saveUserProfile)

export default router