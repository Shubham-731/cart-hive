"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "example-secret";
const generateToken = (id) => {
    const token = jsonwebtoken_1.default.sign(id, JWT_SECRET);
    return token;
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (decoded) {
            return decoded;
        }
        return null;
    }
    catch (error) {
        throw error;
    }
};
exports.verifyToken = verifyToken;
