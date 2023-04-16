import mongoose from "mongoose";

interface CartProduct {
  userId: mongoose.Types.ObjectId;
  productId: number;
  title: string;
  quantity: number;
  price: number;
  image: string;
}

export { CartProduct };
