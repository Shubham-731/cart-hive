// Routes - '/api/...'

import express, { Router } from "express";
import authRoutes from "../routes/authRoutes";

const router: Router = express.Router();

// Authentication routes
router.use("/auth", authRoutes);

// API routes
export default router;
