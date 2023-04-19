import Stripe from "stripe";
import { config } from "dotenv";

config();

const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_PUBLISHABLE_KEY || !STRIPE_SECRET_KEY) {
  throw new Error(`There's no stripe api keys provided!`);
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export default stripe;
