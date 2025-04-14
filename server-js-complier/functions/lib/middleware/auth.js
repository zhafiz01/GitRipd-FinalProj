"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("firebase-admin/auth");
const checkAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer ")))
        res.status(401).send("Forbidden");
    else {
        const token = authHeader.split("Bearer ")[1];
        try {
            const decoded = await (0, auth_1.getAuth)().verifyIdToken(token);
            req.body.user = decoded;
            next();
        }
        catch (error) {
            res.status(401).send("Invalid or expired token");
        }
    }
};
exports.default = checkAuth;
//# sourceMappingURL=auth.js.map