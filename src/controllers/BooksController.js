import { Books } from "../models";

/**
 * @class BooksController
 * @name BooksController
 * @description A collection of controllers for manipulating the Books model.
 */
export default class BooksController {
    /**
     * @name addNewBook
     * @method addNewBook
     * @description A controller used to add new books.
     * @param {Request} req - data about the request sent to this controller.
     * @param {Response} res - the response from this controller.
     * @returns {void}
     */
    static addNewBook(req, res) {
        const ownerId = req.decodedUserProfile.id;
        const { title, author, publicationDate, genres, isPrivate } = req.body;
        const newBook = {
            ownerId,
            title,
            author,
            publicationDate,
            genres,
            isPrivate
        };

        Books.create(newBook)
            .then(createdBook => {
                res.status(200).json({
                    message: "Book successfully created.",
                    createdBook
                });
            })
            .catch(() => {
                res.status(500).json({
                    message: "An error occurred while trying to add this book. Please check your request and try again.",
                    error: "FailedToAddNewBookError"
                });
            });
    }

    /**
     * @name getAllBooks
     * @method getAllBooks
     * @description A controller used to fetch all the public books stored
     * in the app.
     * @param {Request} req - data about the request sent to this controller.
     * @param {Response} res - the response from this controller.
     * @returns {void}
     */
    static getAllBooks(req, res) {
        Books
            .findAll({
                attributes: ["id", "title", "author", "publicationDate", "genres"],
                where: {
                    isPrivate: false
                }
            })
            .then(allBooks => {
                res.status(200).json({
                    message: "Successfully fetched all books.",
                    books: allBooks
                });
            })
            .catch(() => {
                res.status(500).json({
                    message: "An error occurred while fetching all books. Please check your request and try again.",
                    error: "FailedFetchAllBooksError"
                });
            });
    }
}
