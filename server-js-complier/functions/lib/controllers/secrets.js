"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecret = void 0;
// GET
const getSecret = async (req, res) => {
    try {
        console.log("hello");
        if (!req.body.loggedInUser)
            throw new Error();
        res.status(200).send(req.body.loggedInUser);
    }
    catch (e) {
        res.status(401).send("Not Logged In");
    }
};
exports.getSecret = getSecret;
//# sourceMappingURL=secrets.js.map