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
exports.getOrdersHandler = exports.createOrderHandler = void 0;
const jwt_1 = require("../utils/jwt");
const User_1 = __importDefault(require("../models/User"));
const Order_1 = __importDefault(require("../models/Order"));
const createOrderHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products, authToken, } = req.body;
        // Get userId
        const decodedUserId = (0, jwt_1.verifyToken)(authToken);
        const user = yield User_1.default.findById(decodedUserId);
        if (!user) {
            res.status(401).json({
                msg: "Unauthorized access to resource!",
            });
            return;
        }
        const userId = user._id;
        // Create order
        products.forEach((product) => __awaiter(void 0, void 0, void 0, function* () {
            yield Order_1.default.create(Object.assign(Object.assign({}, product), { userId }));
        }));
        // Return success response
        res.status(201).json({
            msg: "Orders created!",
        });
    }
    catch (error) {
        const errorMsg = error instanceof Error && error.message;
        res.status(500).json({
            msg: errorMsg,
        });
    }
});
exports.createOrderHandler = createOrderHandler;
const getOrdersHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get payload
        const { authToken } = req.body;
        // Verify user
        const decodedUserId = (0, jwt_1.verifyToken)(authToken);
        const user = yield User_1.default.findById(decodedUserId);
        if (!user) {
            res.json({
                msg: "User not found!",
            });
            return;
        }
        const userId = user._id;
        // Get orders by userId
        const orders = yield Order_1.default.find({ userId }).sort({ _id: -1 });
        res.status(200).json({
            msg: "Orders found!",
            orders,
        });
    }
    catch (error) {
        const errorMsg = error instanceof Error && error.message;
        res.json({
            msg: errorMsg,
        });
    }
});
exports.getOrdersHandler = getOrdersHandler;
