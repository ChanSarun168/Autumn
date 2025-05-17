"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const server_1 = require("../server");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, _res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Extract token from Authorization header
    if (!token) {
        throw new Error("Token not provided");
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, server_1.privateKey, {
            algorithms: ["RS256"],
        });
        req.role = decodedToken.role;
        req.id = decodedToken.id; // Attach userId to the request object
        next(); // If token is valid, continue to the next middleware or route handler
    }
    catch (error) {
        throw new Error(error.message); // Throw error for invalid token
    }
};
exports.verifyToken = verifyToken;
