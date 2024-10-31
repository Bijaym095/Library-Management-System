import User from "../models/user-model.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { generateRefreshToken, generateToken } from "../utils/token.js";

// @desc Register user
// @route POST /api/auth/register
// @access Public
export const registerUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({ success: true, user });
});

// @desc Login a user
// @route POST /api/auth/login
// @access Public
export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. Find user by email
  const user = await User.findOne({ email });
  if (!user) return next(new AppError("User not found", 404));

  // 2. Compare the provided password with the stored hashed password
  const match = await user.compareHashPassword(password);
  if (!match) return next(new AppError("Incorrect Password", 401));

  // 3. Create the JWT payload
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  // 4. Generate access token and refresh token
  const accessToken = generateToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // 5. Send refresh token as a cookie and access token in the response
  res.cookie("refreshToken", refreshToken, {
    sameSite: false,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: false,
  });
  res.status(200).json({ token: accessToken });
});

export const logoutUser = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    res.clearCookie("refreshToken");
    res.json({ message: "Logout successfully" });
  }
});

export const forgotPassword = catchAsync(async (req, res, next) => {});
