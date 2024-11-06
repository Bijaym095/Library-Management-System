import express from "express";
import { addBook, deleteBook, getBooks, getSingleBook } from "../controllers/book-controller.js";

const bookRoute = express.Router();

bookRoute.route("/").get(getBooks).post(addBook);
bookRoute.route("/:id").get(getSingleBook).delete(deleteBook);

export default bookRoute;