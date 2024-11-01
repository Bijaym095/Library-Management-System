import express from "express";
import { loginUser, logoutUser, refreshAccessToken, registerUser } from "../controllers/auth-controller.js";
import { validate } from "../middlewares/validate-middleware.js";
import { loginSchema, registrationSchema } from "../middlewares/validators/auth-validator.js";
import { verifyTokenHandler } from "../middlewares/verifytoken-middleware.js";

const authRoute = express.Router();

authRoute.post("/register", validate(registrationSchema), registerUser);
authRoute.post("/login", validate(loginSchema), loginUser);
authRoute.post("/logout", verifyTokenHandler, logoutUser);
authRoute.post('/refresh-token', refreshAccessToken)

export default authRoute;
