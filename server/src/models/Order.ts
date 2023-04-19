import mongoose, { Schema, Model } from "mongoose";
import { OrderedProduct } from "../types/ProductTypes";

interface OrderModel extends OrderedProduct {
  userId: mongoose.Types.ObjectId;
}

const orderSchema: mongoose.Schema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Order: Model<OrderModel> =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
