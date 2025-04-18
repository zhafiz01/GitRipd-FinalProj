import express from "express"
import { onRequest } from "firebase-functions/v2/https"
import cors from "cors"
import userRouter from "./routes/userRouter"
import exerciseRouter from "./routes/exerciseRouter"
import workoutPlanRouter from "./routes/workoutPlanRouter"
import establishConnection from "./middleware/establishConnection"

const app = express()

app.use(cors({ origin: true }))
app.use(express.json())
app.use(establishConnection)
app.use("/exercises", exerciseRouter)
app.use("/plans", workoutPlanRouter)
app.use("/user", userRouter)

export const api = onRequest(app)
