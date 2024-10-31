import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/auth-controller.js";
import { validate } from "../middlewares/validate-middleware.js";
import { loginSchema, registrationSchema } from "../middlewares/validators/auth-validator.js";
import { verifyToken } from "../middlewares/verifytoken-middleware.js";

const authRoute = express.Router();

authRoute.post("/register", validate(registrationSchema), registerUser);
authRoute.post("/login", validate(loginSchema), loginUser);
authRoute.post("/logout", verifyToken, logoutUser);

export default authRoute;
