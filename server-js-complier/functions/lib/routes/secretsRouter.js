"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const secrets_1 = require("../controllers/secrets");
const routes = (0, express_1.Router)();
routes.get("/", secrets_1.getSecret);
exports.default = routes;
//# sourceMappingURL=secretsRouter.js.map