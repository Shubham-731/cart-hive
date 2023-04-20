import express, { Express, Request, Response } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import apiRoutes from "./apis";
import cors from "cors";

// Dotenv config
config();
const PORT: string | number = process.env.PORT || 3001;
const MONGO_URL: string =
  process.env.MONGO_URL || "mongodb://localhost:27017/CartHive";
const CLIENT_URL: string = process.env.CLIENT_URL || "http://localhost:3000";

const app: Express = express();

// Middlewares
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API
app.use("/api", apiRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "hello world!" });
});

// Connnect to db!
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to DB!");
    // Start the server
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));
  })
  .catch((error) => {
    console.log("Unable to start the server!");
    throw error;
  });
