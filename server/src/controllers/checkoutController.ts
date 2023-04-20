import { Request, Response } from "express";
import stripe from "../lib/stripe";
import { config } from "dotenv";
import { verifyToken } from "../utils/jwt";
import User from "../models/User";
import Stripe from "stripe";

// .env
config();
const CLIENT_URL: string = process.env.CLIENT_URL || "http://localhost:3000";
const WEBHOOK_SECRET: string = process.env.STRIPE_WEBHOOK_SECRET || "";

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

interface CheckoutSession extends Stripe.Checkout.Session {}

// Format products to stripe line items
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

const checkoutHandler = async (req: Request, res: Response): Promise<void> => {
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
      return;
    }

    // Create stripe session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `https://cart-hive-client.vercel.app/cart?success=true&order_id=${orderId}`,
      cancel_url: `https://cart-hive-client.vercel.app/cart?canceled=true&order_id=${orderId}`,
      line_items: formatProducts(products),
      customer_email: user?.email,
      metadata: {
        order_id: orderId,
      },
    });

    if (session.url) {
      res.status(200).json({
        checkoutUrl: session.url,
        msg: "Checkout created!",
      });
      return;
    }
  } catch (error) {
    const errorMsg = error instanceof Error && error.message;
    res.status(500).json({
      msg: errorMsg,
    });
  }
};

const webhookHandler = async (req: Request, res: Response): Promise<void> => {
  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook scret not found!");
  }

  try {
    const stripeSign: string | string[] = req.headers["stripe-signature"] || "";
    const payload: string = JSON.stringify(req.body);

    if (stripeSign) {
      // Verify and get the event
      const event = stripe.webhooks.constructEvent(
        payload,
        stripeSign,
        WEBHOOK_SECRET
      );

      switch (event.type) {
        // Checkout session complete
        case "checkout.session.completed": {
          const session: CheckoutSession = event.data.object as CheckoutSession;

          // Create order...
          console.log(`Order ${session.metadata?.order_id} created!`);

          if (session.payment_status === "paid") {
            // Fullfil order...
            console.log(`(i) Order ${session.metadata?.order_id} finished!`);
          }

          break;
        }

        // Payment succeeded
        case "checkout.session.async_payment_succeeded": {
          const session: CheckoutSession = event.data.object as CheckoutSession;

          // Fulfill the purchase...
          console.log(`(ii) Order ${session.metadata?.order_id} finished!`);

          break;
        }

        // Payment fails
        case "checkout.session.async_payment_failed": {
          const session: CheckoutSession = event.data.object as CheckoutSession;

          // Order fails
          console.log(`Order ${session.metadata?.order_id} failed!`);

          break;
        }

        default:
          break;
      }
    } else {
      res.status(401).json({
        msg: "Unauthorized request!",
      });
      return;
    }

    res.status(200).json({ received: true });
  } catch (error) {
    const errorMsg = error instanceof Error && error.message;
    console.log(errorMsg);
    res.status(500).json({
      msg: errorMsg,
    });
  }
};

export { checkoutHandler, webhookHandler };
