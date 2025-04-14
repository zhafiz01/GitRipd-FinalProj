"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExercisesByMuscle = exports.getTargetMuscles = void 0;
const Exercise_1 = __importDefault(require("../models/Exercise"));
const zylaAPIService_1 = require("../services/zylaAPIService");
// get all targetMuscles
const getTargetMuscles = async (req, res) => {
    try {
        const targetMuscles = await (0, zylaAPIService_1.fetchTargetMuscles)();
        res.status(200).send(targetMuscles);
    }
    catch (error) {
        res.status(500).send("Error fetching target muscles");
    }
};
exports.getTargetMuscles = getTargetMuscles;
// get exercises by targetMuscle
const getExercisesByMuscle = async (req, res) => {
    const { targetMuscle } = req.query;
    if (!targetMuscle || typeof targetMuscle !== "string") {
        res.status(400).send("Missing or invalid muscle group");
    }
    try {
        // check if data already exists in MongoDB
        const cachedExercises = await Exercise_1.default.find({ target: targetMuscle });
        if (cachedExercises.length > 0)
            res.status(200).send(cachedExercises);
        // if not cached, fetch from external API and save to MongoDB
        const apiData = await (0, zylaAPIService_1.fetchExercisesByMuscle)(targetMuscle);
        const savedExercises = await Exercise_1.default.insertMany(apiData);
        res.status(200).send(savedExercises);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error retrieving exercises");
    }
};
exports.getExercisesByMuscle = getExercisesByMuscle;
//# sourceMappingURL=exercises.js.map