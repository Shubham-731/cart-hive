import express, { Router } from "express";
import {
  createOrderHandler,
  getOrdersHandler,
} from "../controllers/orderController";

const router: Router = express.Router();

// @route - POST /api/orders/create
// @desc - Create an order
router.post("/create", createOrderHandler);

// @route - POST /api/orders
// @desc - Get orders created by user
router.post("/", getOrdersHandler);

export default router;
