"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
// @route - /api/auth/register
// @desc - Registers a new user
router.post("/register", authController_1.registerUser);
// @route - /api/auth/login
// @desc - Login a existing user
router.post("/login", authController_1.loginUser);
// @route - /api/auth/logout
// @desc - Logout user
router.get("/logout", authController_1.logoutUser);
// @route - /api/auth/get-user
router.post("/get-user", authController_1.getUser);
exports.default = router;
