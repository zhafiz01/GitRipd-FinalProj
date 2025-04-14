"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveWorkoutPlan = void 0;
const WorkoutPlan_1 = __importDefault(require("../models/WorkoutPlan"));
const establishConnection_1 = require("../middleware/establishConnection");
const saveWorkoutPlan = async (req, res) => {
    try {
        await (0, establishConnection_1.establishConnection)();
        const { exercises } = req.body;
        if (!exercises || !Array.isArray(exercises)) {
            res.status(400).json({ message: "Invalid workout plan data" });
            return;
        }
        const saved = await WorkoutPlan_1.default.create({ exercises });
        res.status(201).json(saved);
    }
    catch (error) {
        console.error("Error saving workout plan:", error);
        res.status(500).json({ message: "Error saving workout plan" });
    }
};
exports.saveWorkoutPlan = saveWorkoutPlan;
//# sourceMappingURL=workoutPlans.js.map