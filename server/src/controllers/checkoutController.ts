import { Request, Response } from "express";
import stripe from "../lib/stripe";
import { config } from "dotenv";
import { verifyToken } from "../utils/jwt";
import User from "../models/User";

// .env
config();
const CLIENT_ADDRESS = process.env.CLIENT_ADDRESS || "http://localhost:3000";
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!CLIENT_ADDRESS || !STRIPE_SECRET_KEY) {
  throw new Error("Please setup environment variables!");
}

// Types
interface Product {
  id: number;
  title: string;
  image: string;
  quantity: number;
  price: number;
}

interface LineItems {
  price_data: {
    currency: "usd" | "inr";
    product_data: {
      name: string;
      images: string[];
    };
    unit_amount: number;
  };
  quantity: number;
}

const formatProducts = (products: Product[]): LineItems[] => {
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

const checkoutHandler = async (req: Request, res: Response) => {
  try {
    const {
      orderId,
      products,
      authToken,
    }: { orderId: string; products: Product[]; authToken: string } = req.body;

    // Authenticate customer
    const decodedUserId = verifyToken(authToken);

    const user = await User.findById(decodedUserId);
    if (!user) {
      res.status(401).json({
        msg: "You're not authorized to checkout!",
      });
    }

    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        success_url: `${CLIENT_ADDRESS}/cart?success=true`,
        cancel_url: `${CLIENT_ADDRESS}/cart?canceled=true`,
        line_items: formatProducts(products),
        customer_email: user?.email,
        metadata: {
          order_id: orderId,
        },
      },
      {
        apiKey: STRIPE_SECRET_KEY,
      }
    );

    if (session.url) {
      res.status(200).json({
        checkoutUrl: session.url,
        msg: "Checkout created!",
      });
    }
  } catch (error) {
    const errorMsg = error instanceof Error && error.message;
    res.status(500).json({
      msg: errorMsg,
    });
  }
};

export { checkoutHandler };
