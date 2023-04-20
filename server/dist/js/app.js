"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const apis_1 = __importDefault(require("./apis"));
const cors_1 = __importDefault(require("cors"));
// Dotenv config
(0, dotenv_1.config)();
const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/CartHive";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// API
app.use("/api", apis_1.default);
app.get("/", (req, res) => {
    res.json({ msg: "hello world!" });
});
// Connnect to db!
mongoose_1.default
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
