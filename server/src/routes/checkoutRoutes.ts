import express, { Router } from "express";
import { checkoutHandler } from "../controllers/checkoutController";

const router: Router = express.Router();

// @route - POST /api/checkout/create-session
// @desc - Create a checkout session using stripe
router.post("/create-session", checkoutHandler);

export default router;
