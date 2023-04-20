"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const router = express_1.default.Router();
// @route - POST /api/orders/create
// @desc - Create an order
router.post("/create", orderController_1.createOrderHandler);
// @route - POST /api/orders
// @desc - Get orders created by user
router.post("/", orderController_1.getOrdersHandler);
exports.default = router;
