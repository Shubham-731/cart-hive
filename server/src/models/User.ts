import mongoose, { Schema, Model } from "mongoose";
import { RegisterUserType } from "../types/user";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    accountType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User: Model<RegisterUserType> =
  mongoose.models.User || mongoose.model("User", userSchema);

export default User;
