import express from "express";
import { loginUser, registerUser } from "../controllers/auth-controller.js";
import { validate } from "../middlewares/validate-middleware.js";
import { loginSchema, registrationSchema } from "../middlewares/validators/auth-validator.js";

const authRoute = express.Router();

authRoute.post("/register", validate(registrationSchema), registerUser);
authRoute.post("/login", validate(loginSchema), loginUser);

export default authRoute;
