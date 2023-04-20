"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkoutController_1 = require("../controllers/checkoutController");
const router = express_1.default.Router();
// @route - POST /api/checkout/create-session
// @desc - Create a checkout session using stripe
router.post("/create-session", checkoutController_1.checkoutHandler);
// @route - POST /api/checkout/stripe-webhook
// @desc - Establish a webhook to verify payments
router.post("/stripe-webhook", express_1.default.raw({ type: "application/json", limit: "1mb" }), checkoutController_1.webhookHandler);
exports.default = router;
