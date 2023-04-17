import Stripe from "stripe";
import { config } from "dotenv";

config();

const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;

if (!STRIPE_PUBLISHABLE_KEY) {
  throw new Error(`There's no stripe api key provided!`);
}

const stripe = new Stripe(STRIPE_PUBLISHABLE_KEY, {
  apiVersion: "2022-11-15",
});

export default stripe;
