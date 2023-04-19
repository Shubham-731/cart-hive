import express, { Router } from "express";
import authRoutes from "../routes/authRoutes";
import checkoutRoutes from "../routes/checkoutRoutes";
import orderRoutes from "../routes/orderRoutes";

const router: Router = express.Router();

// Authentication routes
router.use("/auth", authRoutes);

// Checkout routes
router.use("/checkout", checkoutRoutes);

// Orders routes
router.use("/orders", orderRoutes);

// API routes
export default router;
