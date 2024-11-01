import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./config/db.js";
import errorHandler from "./middlewares/error-middleware.js";
import authRoute from "./routes/auth-route.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Welcome to backend zone!</h1>");
});
app.use("/api/auth", authRoute);

// Global Error Handler
app.use(errorHandler);

const startConnection = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error while connecting server ${err.message}`);
  }
};
startConnection();
