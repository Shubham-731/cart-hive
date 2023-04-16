import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { generateToken, verifyToken } from "../utils/jwt";
import { RegisterUserType, LoginUserType } from "../types/UserTypes";

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

// Register user
const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password }: RegisterUserType = req.body;

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
    });

    // Generate JWT token from objectId
    const userId = newUser._id.toString();
    const authToken = generateToken(userId);

    // Send the response
    const returnUserData = sendUser(newUser);
    res.status(201).json({
      msg: "Successfully registered!",
      user: returnUserData,
      authToken,
    });
  } catch (error) {
    const errorMsg = error instanceof Error && error.message;
    res.status(500).json({
      msg: errorMsg,
    });
  }
};

// Login user
const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginUserType = req.body;

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

    // Return the user
    const returnUserData = sendUser(user);
    res.status(200).json({
      msg: "Successfully logged in!",
      user: returnUserData,
      authToken,
    });
  } catch (error) {
    const errorMsg = error instanceof Error && error.message;
    res.status(500).json({
      msg: errorMsg,
    });
  }
};

// Logout user
const logoutUser = async (req: Request, res: Response) => {
  try {
    res.cookie("auth-token", "", { maxAge: 1 });
    res.status(200).json({
      msg: "Logout success!",
    });
  } catch (error) {
    const errorMsg = error instanceof Error && error.message;
    res.status(500).json({
      msg: errorMsg,
    });
  }
};

// Get user
const getUser = async (req: Request, res: Response) => {
  try {
    const { authToken }: { authToken: string } = req.body;
    const decodedUserId = verifyToken(authToken);

    const user = await User.findById(decodedUserId);
    if (!user) {
      res.status(404).json({
        msg: "User not found!",
      });
    }

    res.status(200).json({
      msg: "User found!",
      user: user && sendUser(user),
    });
  } catch (error) {
    const errorMsg = error instanceof Error && error.message;
    res.status(500).json({
      msg: errorMsg,
    });
  }
};

export { registerUser, loginUser, logoutUser, getUser };
