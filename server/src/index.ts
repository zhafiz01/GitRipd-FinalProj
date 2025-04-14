import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import exerciseRouter from "./routes/exerciseRouter"
import workoutPlanRouter from "./routes/workoutPlanRouter"

dotenv.config()
console.log("🔍 Test from index.ts: ZYLA_API_KEY =", process.env.ZYLA_API_KEY)


const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Add routes
app.use("/api", exerciseRouter)
app.use("/api", workoutPlanRouter)

// Default route
app.get("/", (_req, res) => {
    res.send("Workout Planner API is live!")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



/*

import express from "express"
import { onRequest } from "firebase-functions/v2/https"
import cors from "cors"

import exerciseRouter from "./routes/exerciseRouter"
//import secretsRouter from "./routes/secretsRouter"
import establishConnection from "./middleware/establishConnection"
//import checkAuth from "./middleware/auth"

const app = express()

app.use(cors({ origin: true }))
app.use(express.json())
app.use(establishConnection)
app.use("/api", exerciseRouter)

app.get("/test", (req, res) => {
    res.send("Server is working!")
  })

//app.use("/secret", checkAuth, secretsRouter)

export const api = onRequest(app)

*/