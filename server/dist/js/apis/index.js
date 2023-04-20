"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("../routes/authRoutes"));
const checkoutRoutes_1 = __importDefault(require("../routes/checkoutRoutes"));
const orderRoutes_1 = __importDefault(require("../routes/orderRoutes"));
const router = express_1.default.Router();
// Authentication routes
router.use("/auth", authRoutes_1.default);
// Checkout routes
router.use("/checkout", checkoutRoutes_1.default);
// Orders routes
router.use("/orders", orderRoutes_1.default);
// API routes
exports.default = router;
