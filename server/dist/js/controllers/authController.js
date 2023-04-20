"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../utils/jwt");
const sendUser = (user) => {
    return {
        fullName: user.fullName,
        email: user.email,
        accountType: user.accountType,
    };
};
// Register user
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, password } = req.body;
        // Check if user is already registered
        const user = yield User_1.default.findOne({ email });
        if (user) {
            return res.status(409).json({
                msg: "User already registered!",
            });
        }
        // Encrypt the password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // Register the user
        const newUser = yield User_1.default.create({
            fullName,
            email,
            password: hashedPassword,
        });
        // Generate JWT token from objectId
        const userId = newUser._id.toString();
        const authToken = (0, jwt_1.generateToken)(userId);
        // Send the response
        const returnUserData = sendUser(newUser);
        res.status(201).json({
            msg: "Successfully registered!",
            user: returnUserData,
            authToken,
        });
    }
    catch (error) {
        const errorMsg = error instanceof Error && error.message;
        res.status(500).json({
            msg: errorMsg,
        });
    }
});
exports.registerUser = registerUser;
// Login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Check if user exist
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                msg: "User not found!",
            });
        }
        // Match the password
        const verified = yield bcryptjs_1.default.compare(password, user.password);
        if (!verified) {
            return res.status(409).json({
                msg: "Invalid email or password!",
            });
        }
        // Generate JWT token from objectId
        const userId = user._id.toString();
        const authToken = (0, jwt_1.generateToken)(userId);
        // Return the user
        const returnUserData = sendUser(user);
        res.status(200).json({
            msg: "Successfully logged in!",
            user: returnUserData,
            authToken,
        });
    }
    catch (error) {
        const errorMsg = error instanceof Error && error.message;
        res.status(500).json({
            msg: errorMsg,
        });
    }
});
exports.loginUser = loginUser;
// Logout user
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.cookie("auth-token", "", { maxAge: 1 });
        res.status(200).json({
            msg: "Logout success!",
        });
    }
    catch (error) {
        const errorMsg = error instanceof Error && error.message;
        res.status(500).json({
            msg: errorMsg,
        });
    }
});
exports.logoutUser = logoutUser;
// Get user
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authToken } = req.body;
        const decodedUserId = (0, jwt_1.verifyToken)(authToken);
        const user = yield User_1.default.findById(decodedUserId);
        if (!user) {
            res.json({
                msg: "User not found!",
            });
            return;
        }
        res.status(200).json({
            msg: "User found!",
            user: user && sendUser(user),
        });
    }
    catch (error) {
        const errorMsg = error instanceof Error && error.message;
        res.status(500).json({
            msg: errorMsg,
        });
    }
});
exports.getUser = getUser;
