import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import * as functions from "firebase-functions"
import { establishConnection } from "./middleware/establishConnection"
import exerciseRouter from "./routes/exerciseRouter"
import workoutPlanRouter from "./routes/workoutPlanRouter"

dotenv.config()

const app = express()

// Setup middleware and routes BEFORE export
app.use(cors())
app.use(express.json())

app.use("/api", exerciseRouter)
app.use("/api", workoutPlanRouter)

app.get("/", (_req, res) => {
  res.send("Workout Planner API is live!")
})

app.get("/api/test", (_req, res) => {
  res.send("exerciseRouter is working")
})

let isConnected = false

app.use("/", async (req, res, next) => {
  if (!isConnected) {
    try {
      await establishConnection()
      isConnected = true
      console.log("✅ MongoDB connected (Firebase mode)")
    } catch (err) {
      console.error("❌ MongoDB connection failed:", err)
      res.status(500).send("Database connection error")
    }
  }
  next()
})

app.use((req, _res, next) => {
  console.log(`🌐 Incoming request: ${req.method} ${req.originalUrl}`)
  next()
})

if (process.env.FUNCTIONS_EMULATOR) {
  const PORT = 5050
  establishConnection().then(() => {
    console.log("✅ DB connected (local)")
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  }).catch(console.error)
}

// ✅ Works in both emulator & deployed cloud function
export const api = functions.https.onRequest(app)


/*
dotenv.config()

console.log("🔍 Test from index.ts: ZYLA_API_KEY =", process.env.ZYLA_API_KEY)

const app = express()

const startServer = async () => {
  try {

    await establishConnection()
    console.log("✅ Database connected successfully")
    

    app.use(cors())
    app.use(express.json())

    app.use("/api", exerciseRouter)
    app.use("/api", workoutPlanRouter)

    app.get("/", (_req, res) => {
      res.send("Workout Planner API is live!")
    })

    app.use((req, res, next) => {
      console.log(`🌐 Incoming request: ${req.method} ${req.originalUrl}`)
      next()
    })

    const PORT = process.env.FUNCTIONS_EMULATOR ? 5050 : process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })

  } catch (error) {
    console.error("❌ Error starting server:", error)
  }
}

startServer()

export const api = functions.https.onRequest(app)
*/