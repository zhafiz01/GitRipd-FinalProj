"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const workoutPlans_1 = require("../controllers/workoutPlans");
const router = express_1.default.Router();
router.post("/", workoutPlans_1.saveWorkoutPlan);
exports.default = router;
//# sourceMappingURL=workoutPlanRouter.js.map