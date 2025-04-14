"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.establishConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const establishConnection = async () => {
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
        conn;
    }
    catch (err) {
        console.error("MongoDB connection error:", err);
    }
};
exports.establishConnection = establishConnection;
/*

import type {
    Request,
    Response,
    NextFunction
} from "express"
import mongoose from "mongoose"
import * as dotenv from "dotenv"

dotenv.config()

let isConnected = false

const connectToDatabase = async (): Promise<void> => {
    if (
        isConnected ||
        mongoose.connection.readyState === 1
    )
        return

    await mongoose.connect(process.env.MONGO_URI ?? "")
    isConnected = true
    console.log("MongoDB connected")
}

const establishConnection = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await connectToDatabase()
        next()
    } catch (err) {
        res
            .status(500)
            .json({ error: "Database connection failed" })
    }
}
export default establishConnection

*/ 
//# sourceMappingURL=establishConnection.js.map