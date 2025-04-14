"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchExercisesByMuscle = exports.fetchTargetMuscles = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const ZYLA_API_URL = "https://zylalabs.com/api/4210/ai+workout+planner+api/5108/list+by+target+muscle";
const fetchTargetMuscles = async () => {
    var _a;
    const endpoint = `${ZYLA_API_URL}/5107/list+of+target+muscles`;
    try {
        const response = await axios_1.default.get(ZYLA_API_URL + endpoint, {
            headers: {
                "Authorization": `Bearer ${process.env.ZYLA_API_KEY}`,
                "X-RapidAPI-Host": "ai-workout-planner.p.rapidapi.com",
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Zyla API Error (getTargetMuscles):", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        throw error;
    }
};
exports.fetchTargetMuscles = fetchTargetMuscles;
const fetchExercisesByMuscle = async (muscleGroup) => {
    const response = await axios_1.default.get(ZYLA_API_URL, {
        headers: {
            "Authorization": `Bearer ${process.env.ZYLA_API_KEY}`,
            "X-RapidAPI-Host": "ai-workout-planner.p.rapidapi.com",
        },
        params: { target: muscleGroup }
    });
    const exercises = response.data.map((exercise) => ({
        bodyPart: exercise.bodyPart,
        equipment: exercise.equipment,
        gifUrl: exercise.gifUrl,
        id: exercise.id,
        name: exercise.name,
        muscleGroup: exercise.muscleGroup,
        videos: exercise.videos || []
    }));
    return exercises;
};
exports.fetchExercisesByMuscle = fetchExercisesByMuscle;
//# sourceMappingURL=zylaAPIService.js.map