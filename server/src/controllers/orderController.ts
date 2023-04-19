import { Request, Response } from "express";
import { OrderedProduct } from "../types/ProductTypes";
import { verifyToken } from "../utils/jwt";
import User from "../models/User";
import Order from "../models/Order";

const createOrderHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      products,
      authToken,
    }: {
      products: OrderedProduct[];
      authToken: string;
    } = req.body;

    // Get userId
    const decodedUserId = verifyToken(authToken);

    const user = await User.findById(decodedUserId);
    if (!user) {
      res.status(401).json({
        msg: "Unauthorized access to resource!",
      });

      return;
    }
    const userId = user._id;

    // Create order
    products.forEach(async (product) => {
      await Order.create({ ...product, userId });
    });

    // Return success response
    res.status(201).json({
      msg: "Orders created!",
    });
  } catch (error) {
    const errorMsg = error instanceof Error && error.message;
    res.status(500).json({
      msg: errorMsg,
    });
  }
};

const getOrdersHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get payload
    const { authToken }: { authToken: string } = req.body;

    // Verify user
    const decodedUserId = verifyToken(authToken);
    const user = await User.findById(decodedUserId);
    if (!user) {
      res.json({
        msg: "User not found!",
      });
      return;
    }
    const userId = user._id;

    // Get orders by userId
    const orders = await Order.find({ userId }).sort({ _id: -1 });

    res.status(200).json({
      msg: "Orders found!",
      orders,
    });
  } catch (error) {
    const errorMsg = error instanceof Error && error.message;
    res.json({
      msg: errorMsg,
    });
  }
};

export { createOrderHandler, getOrdersHandler };
