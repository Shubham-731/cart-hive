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
exports.webhookHandler = exports.checkoutHandler = void 0;
const stripe_1 = __importDefault(require("../lib/stripe"));
const dotenv_1 = require("dotenv");
const jwt_1 = require("../utils/jwt");
const User_1 = __importDefault(require("../models/User"));
// .env
(0, dotenv_1.config)();
const CLIENT_ADDRESS = process.env.CLIENT_ADDRESS || "http://localhost:3000";
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
if (!WEBHOOK_SECRET || !CLIENT_ADDRESS) {
    throw new Error("Please populate environment variables properly!");
}
// Format products to stripe line items
const formatProducts = (products) => {
    return products.map((product) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: product.title,
                images: [product.image],
            },
            unit_amount: Math.floor(product.price) * 100,
        },
        quantity: product.quantity,
    }));
};
const checkoutHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId, products, authToken, } = req.body;
        // Authenticate customer
        const decodedUserId = (0, jwt_1.verifyToken)(authToken);
        const user = yield User_1.default.findById(decodedUserId);
        if (!user) {
            res.status(401).json({
                msg: "You're not authorized to checkout!",
            });
            return;
        }
        // Create stripe session
        const session = yield stripe_1.default.checkout.sessions.create({
            mode: "payment",
            success_url: `${CLIENT_ADDRESS}/cart?success=true&order_id=${orderId}`,
            cancel_url: `${CLIENT_ADDRESS}/cart?canceled=true&order_id=${orderId}`,
            line_items: formatProducts(products),
            customer_email: user === null || user === void 0 ? void 0 : user.email,
            metadata: {
                order_id: orderId,
            },
        });
        if (session.url) {
            res.status(200).json({
                checkoutUrl: session.url,
                msg: "Checkout created!",
            });
            return;
        }
    }
    catch (error) {
        const errorMsg = error instanceof Error && error.message;
        res.status(500).json({
            msg: errorMsg,
        });
    }
});
exports.checkoutHandler = checkoutHandler;
const webhookHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const stripeSign = req.headers["stripe-signature"] || "";
        const payload = JSON.stringify(req.body);
        if (stripeSign) {
            // Verify and get the event
            const event = stripe_1.default.webhooks.constructEvent(payload, stripeSign, WEBHOOK_SECRET);
            switch (event.type) {
                // Checkout session complete
                case "checkout.session.completed": {
                    const session = event.data.object;
                    // Create order...
                    console.log(`Order ${(_a = session.metadata) === null || _a === void 0 ? void 0 : _a.order_id} created!`);
                    if (session.payment_status === "paid") {
                        // Fullfil order...
                        console.log(`(i) Order ${(_b = session.metadata) === null || _b === void 0 ? void 0 : _b.order_id} finished!`);
                    }
                    break;
                }
                // Payment succeeded
                case "checkout.session.async_payment_succeeded": {
                    const session = event.data.object;
                    // Fulfill the purchase...
                    console.log(`(ii) Order ${(_c = session.metadata) === null || _c === void 0 ? void 0 : _c.order_id} finished!`);
                    break;
                }
                // Payment fails
                case "checkout.session.async_payment_failed": {
                    const session = event.data.object;
                    // Order fails
                    console.log(`Order ${(_d = session.metadata) === null || _d === void 0 ? void 0 : _d.order_id} failed!`);
                    break;
                }
                default:
                    break;
            }
        }
        else {
            res.status(401).json({
                msg: "Unauthorized request!",
            });
            return;
        }
        res.status(200).json({ received: true });
    }
    catch (error) {
        const errorMsg = error instanceof Error && error.message;
        console.log(errorMsg);
        res.status(500).json({
            msg: errorMsg,
        });
    }
});
exports.webhookHandler = webhookHandler;
