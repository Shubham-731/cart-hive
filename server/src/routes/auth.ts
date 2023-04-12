import express, { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth";

const router: Router = express.Router();

// @route - /auth/register
// @desc - Registers a new user
router.post("/register", registerUser);

// @route - /auth/login
// @desc - Login a existing user
router.post("/login", loginUser);

export default router;
