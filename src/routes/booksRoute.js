import express from "express";

import { BooksController } from "../controllers/";
import validateToken from "../middleware/validateToken";
import validateNewBook from "../middleware/validateNewBook";

const booksRoute = express.Router();
booksRoute.route("/addNewBook").post(validateToken, validateNewBook, BooksController.addNewBook);
booksRoute.route("/").get(validateToken, BooksController.getAllBooks);

export default booksRoute;
