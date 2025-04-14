"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const exerciseRouter_1 = __importDefault(require("./routes/exerciseRouter"));
dotenv_1.default.config();
console.log("🔍 Test from index.ts: ZYLA_API_KEY =", process.env.ZYLA_API_KEY);
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Add routes
app.use("/api", exerciseRouter_1.default);
// Default route
app.get("/", (_req, res) => {
    res.send("Workout Planner API is live!");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
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
//# sourceMappingURL=index.js.map