import express, { Router } from "express";
import {
  checkoutHandler,
  webhookHandler,
} from "../controllers/checkoutController";

const router: Router = express.Router();

// @route - POST /api/checkout/create-session
// @desc - Create a checkout session using stripe
router.post("/create-session", checkoutHandler);

// @route - POST /api/checkout/stripe-webhook
// @desc - Establish a webhook to verify payments
router.post(
  "/stripe-webhook",
  express.raw({ type: "application/json", limit: "1mb" }),
  webhookHandler
);

export default router;
