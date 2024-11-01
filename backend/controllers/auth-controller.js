import User from "../models/user-model.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { generateRefreshToken, generateToken, verifyToken } from "../utils/token.js";

// @desc Register user
// @route POST /api/auth/register
// @access Public
export const registerUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({ success: true, user });
});

// @desc Login user
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

// @desc Logout user
// @route POST /api/auth/logout
// @access Private
export const logoutUser = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    res.clearCookie("refreshToken");
    res.json({ message: "Logout successfully" });
  }
});

// @desc Refreshes an access token
// @route POST /api/auth/refresh-token
// @access Public
export const refreshAccessToken = catchAsync(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) return next(new AppError("Refresh token is required", 401));

  // 1. Verify refresh token
  const decoded = verifyToken(refreshToken, process.env.REFRESH_SECRET_KEY);
  if (!decoded) return next(new AppError("Invalid or expired refresh token.", 403));

  // 2. Find the user associated with token
  const user = await User.findOne({ email: decoded.email });

  if (user) {
    // 3. Create the JWT payload
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // 4. Generate a new access token
    const newAccessToken = generateToken(payload);
    res.status(200).json({ newAccessToken });
  } else {
    next(new AppError("Invalid or expired refresh token.", 403));
  }
});