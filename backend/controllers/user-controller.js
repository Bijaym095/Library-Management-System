import User from "../models/user-model.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

// @desc Get all users
// @route GET /api/users/
// Private
export const getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc Add user details
// @route POST /api/users/
// Private
export const addUser = catchAsync(async(req, res, next)=> {
  const user = User.create(req.body);
  res.status(201).json({user});
})

// @desc Get user details
// @route GET /api/users/:id
// Private
export const getSingleUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const users = await User.findById(id);
  res.status(200).json(users);
});

// @desc Update user details
// @route PUT /api/users/:id
// Private
export const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, req.body, {
    returnDocument: "after",
  });
  if (!user) return next(new AppError("User not found", 404));

  res.status(200).json({ user });
});

// @desc Delete user details
// @route DELETE /api/users/:id
// Private
export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (!user) return next(new AppError("User not found", 404));

  res.status(204).json({});
});
