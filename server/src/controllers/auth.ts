import { Request, Response, Send } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { RegisterUserType, LoginUserType } from "../types/user";

interface SendUserType {
  fullName: string;
  email: string;
  accountType: string;
}

const sendUser = (user: RegisterUserType): SendUserType => {
  return {
    fullName: user.fullName,
    email: user.email,
    accountType: user.accountType,
  };
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      password,
      accountType,
      rememberMe,
    }: RegisterUserType = req.body;

    // Check if user is already registered
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        msg: "User already registered!",
      });
    }

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Register the user
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      accountType,
    });

    // Generate JWT token from objectId
    const userId = newUser._id.toString();
    const authToken = generateToken(userId);

    // Set the cookie
    res.cookie("auth-token", authToken, {
      maxAge: rememberMe ? 5 * 24 * 60 * 60 * 1000 : 2 * 24 * 60 * 60 * 1000, // maxAge(in ms): rememberMe ? 5 days : 2 days
      httpOnly: true,
      sameSite: true,
    });

    // Send the response
    const returnUserData = sendUser(newUser);
    res.status(201).json({
      msg: "Successfully registered!",
      user: returnUserData,
    });
  } catch (error) {
    const errorMsg = error instanceof Error && error.message;
    res.status(500).json({
      msg: errorMsg,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password, rememberMe }: LoginUserType = req.body;

    // Check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        msg: "User not found!",
      });
    }

    // Match the password
    const verified = await bcrypt.compare(password, user.password);
    if (!verified) {
      return res.status(409).json({
        msg: "Invalid email or password!",
      });
    }

    // Generate JWT token from objectId
    const userId = user._id.toString();
    const authToken = generateToken(userId);

    // Set the cookie
    res.cookie("auth-token", authToken, {
      maxAge: rememberMe ? 5 * 24 * 60 * 60 * 1000 : 2 * 24 * 60 * 60 * 1000, // maxAge(in ms): rememberMe ? 5 days : 2 days
      httpOnly: true,
      sameSite: true,
    });

    // Return the user
    const returnUserData = sendUser(user);
    res.status(200).json({
      msg: "Successfully logged in!",
      user: returnUserData,
    });
  } catch (error) {
    const errorMsg = error instanceof Error && error.message;
    res.status(500).json({
      msg: errorMsg,
    });
  }
};

export { registerUser, loginUser };
