import Book from "../models/book-model.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";

// @desc get all books
// @route /api/books
// Private
export const getBooks = catchAsync(async (req, res, next) => {
  const books = await Book.find();
  res.status(200).json(books);
});

// @desc get all books
// @route /api/books
// Private
export const addBook = catchAsync(async (req, res, next) => {
  const book = await Book.create(req.body)
  res.status(201).json(book)
})

// @desc get single book details
// @route /api/books/:id
// Private
export const getSingleBook = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const book = await Book.findById(id);

  res.status(200).json(book)
});

// @desc update book details
// @route /api/books/:id
// Private
export const updateBook = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const book = await Book.findByIdAndUpdate(id, req.body, {
    returnDocument: "after",
  });
  if (!book) return next(new AppError("Book not found", 404));

  res.status(200).json({ book });
});

// @desc delete book details
// @route /api/books/:id
// Private
export const deleteBook = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const book = await Book.findByIdAndDelete(id);
  if (!book) return next(new AppError("Book not found", 404));

  res.status(204).json();
});
