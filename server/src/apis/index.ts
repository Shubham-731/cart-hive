import express, { Router } from "express";
import authRoutes from "../routes/authRoutes";
import checkoutRoutes from "../routes/checkoutRoutes";

const router: Router = express.Router();

// Authentication routes
router.use("/auth", authRoutes);

// Checkout routes
router.use("/checkout", checkoutRoutes);

// API routes
export default router;
