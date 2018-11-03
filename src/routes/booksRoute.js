import express from "express";

import { BooksController } from "../controllers/";
import validateToken from "../middleware/validateToken";

const booksRoute = express.Router();
booksRoute.route("/addNewBook").post(validateToken, BooksController.addNewBook);

export default booksRoute;
