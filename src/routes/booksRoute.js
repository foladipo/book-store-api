import express from "express";

import { BooksController } from "../controllers/";
import validateToken from "../middleware/validateToken";
import validateNewBook from "../middleware/validateNewBook";
import validateBookUpdate from "../middleware/validateBookUpdate";

const booksRoute = express.Router();
booksRoute.route("/addNewBook").post(validateToken, validateNewBook, BooksController.addNewBook);
booksRoute.route("/").get(validateToken, BooksController.getAllBooks);
booksRoute.route("/:id")
    .get(validateToken, BooksController.getBook)
    .put(validateToken, validateBookUpdate, BooksController.updateBook)
    .delete(validateToken, BooksController.deleteBook);

export default booksRoute;
