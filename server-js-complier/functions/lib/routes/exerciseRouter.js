"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exercises_1 = require("../controllers/exercises");
const router = express_1.default.Router();
router.get("/targets", exercises_1.getTargetMuscles);
router.get("/exercises/:muscle", exercises_1.getExercisesByMuscle);
exports.default = router;
//# sourceMappingURL=exerciseRouter.js.map