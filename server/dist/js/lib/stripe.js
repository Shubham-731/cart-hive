"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
if (!STRIPE_PUBLISHABLE_KEY || !STRIPE_SECRET_KEY) {
    throw new Error(`There's no stripe api keys provided!`);
}
const stripe = new stripe_1.default(STRIPE_SECRET_KEY, {
    apiVersion: "2022-11-15",
});
exports.default = stripe;
