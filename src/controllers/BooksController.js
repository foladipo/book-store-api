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

    /**
     * @name getBook
     * @method getBook
     * @description A controller used to fetch a specific book.
     * @param {Request} req - data about the request sent to this controller.
     * @param {Response} res - the response from this controller.
     * @returns {void}
     */
    static getBook(req, res) {
        const pathInfo = req.path.split("/");
        const bookIdString = pathInfo[pathInfo.length - 1];

        const bookId = Number(bookIdString);
        if (Number.isNaN(bookId)) {
            res.status(400).json({
                message: "The book ID you supplied is not a valid number.",
                error: "InvalidBookIdError"
            });
            return;
        }
        if (bookId % 1 > 0) {
            res.status(400).json({
                message: "The ID of the book you are requesting for must be an integer.",
                error: "NonIntegerBookIdError"
            });
            return;
        }

        Books
            .findOne({
                where: {
                    id: bookId
                }
            })
            .then(book => {
                if (!book) {
                    res.status(404).json({
                        message: "The book you requested for does not exist.",
                        error: "BookNotFoundError"
                    });
                    return;
                }

                const requesterId = req.decodedUserProfile.id;
                if (book.ownerId === requesterId || !book.isPrivate) {
                    const { id, title, author, publicationDate, genres } = book;
                    res.status(200).json({
                        message: "Book successfully found.",
                        books: [{
                            id,
                            title,
                            author,
                            publicationDate,
                            genres
                        }]
                    });
                } else {
                    res.status(403).json({
                        message: "You do not have the permissions to view this book.",
                        error: "BookAccessDeniedError"
                    });
                }
            })
            .catch(() => {
                res.status(500).json({
                    message: "An error occurred while getting the book you requested. Please check your request and try again.",
                    error: "FailedFetchBookError"
                });
            });
    }

    /**
     * @name updateBook
     * @method updateBook
     * @description A controller used to edit a book.
     * @param {Request} req - data about the request sent to this controller.
     * @param {Response} res - the response from this controller.
     * @returns {void}
     */
    static updateBook(req, res) {
        const pathInfo = req.path.split("/");
        const bookIdString = pathInfo[pathInfo.length - 1];

        const bookId = Number(bookIdString);
        if (Number.isNaN(bookId)) {
            res.status(400).json({
                message: "The book ID you supplied is not a valid number.",
                error: "InvalidBookIdError"
            });
            return;
        }
        if (bookId % 1 > 0) {
            res.status(400).json({
                message: "The ID of the book you are trying to update must be an integer.",
                error: "NonIntegerBookIdError"
            });
            return;
        }

        Books
            .findOne({
                where: {
                    id: bookId
                }
            })
            .then(book => {
                if (!book) {
                    res.status(404).json({
                        message: "The book you tried to update does not exist.",
                        error: "BookNotFoundError"
                    });
                    return;
                }

                const requesterId = req.decodedUserProfile.id;
                if (book.ownerId !== requesterId){
                    res.status(403).json({
                        message: "You do not have the permission to update this book.",
                        error: "UnallowedBookEditAttemptError"
                    });
                    return;
                }

                const bookUpdate = {};
                const reqBody = req.body;
                if (reqBody.title) {
                    bookUpdate.title = reqBody.title;
                }
                if (reqBody.author) {
                    bookUpdate.author = reqBody.author;
                }
                if (reqBody.publicationDate) {
                    bookUpdate.publicationDate = reqBody.publicationDate;
                }
                if (reqBody.genres) {
                    bookUpdate.genres = reqBody.genres;
                }
                if (typeof reqBody.isPrivate === "boolean") {
                    bookUpdate.isPrivate = reqBody.isPrivate;
                }

                if (Object.keys(bookUpdate).length === 0) {
                    res.status(400).json({
                        message: "Error. You have not supplied any new data for use in updating your book.",
                        error: "EmptyBookUpdateError"
                    });
                    return;
                }

                Books
                    .update(bookUpdate, {
                        where: {
                            id: book.id
                        },
                        returning: true
                    })
                    .then(updatedBooks => {
                        const updatedBook = updatedBooks[1][0];
                        const { title, author, publicationDate, genres,
                            isPrivate } = updatedBook;
                        res.status(200).json({
                            message: "Your book has been updated",
                            books: [
                                {
                                    title,
                                    author,
                                    publicationDate,
                                    genres,
                                    isPrivate
                                }
                            ]
                        });
                    })
                    .catch(() => {
                        res.status(500).json({
                            message: "An error occurred while updating your book. Please check your request and try again.",
                            error: "FailedEditBookError"
                        });
                    });
            });
    }

    /**
     * @name deleteBook
     * @method deleteBook
     * @description A controller used to delete a book.
     * @param {Request} req - data about the request sent to this controller.
     * @param {Response} res - the response from this controller.
     * @returns {void}
     */
    static deleteBook(req, res) {
        const pathInfo = req.path.split("/");
        const bookIdString = pathInfo[pathInfo.length - 1];

        const bookId = Number(bookIdString);
        if (Number.isNaN(bookId)) {
            res.status(400).json({
                message: "The book ID you supplied is not a valid number.",
                error: "InvalidBookIdError"
            });
            return;
        }
        if (bookId % 1 > 0) {
            res.status(400).json({
                message: "The ID of the book you are trying to delete must be an integer.",
                error: "NonIntegerBookIdError"
            });
            return;
        }

        Books
            .findOne({
                where: {
                    id: bookId
                }
            })
            .then(book => {
                if (!book) {
                    res.status(404).json({
                        message: "The book you tried to delete does not exist.",
                        error: "BookNotFoundError"
                    });
                    return;
                }

                const requesterId = req.decodedUserProfile.id;
                if (book.ownerId === requesterId) {
                    Books
                        .destroy({
                            where: {
                                id: bookId
                            }
                        })
                        .then(() => {
                            res.status(200).json({
                                message: "Book successfully deleted."
                            });
                        })
                        .catch(() => {
                            res.status(500).json({
                                message: "An error occurred while deleting this book of yours. Please check your request and try again.",
                                error: "FailedDeleteBookError"
                            });
                        });
                } else {
                    res.status(403).json({
                        message: "You do not have the permissions to delete this book.",
                        error: "BookAccessDeniedError"
                    });
                }
            })
            .catch(() => {
                res.status(500).json({
                    message: "An error occurred while deleting that book. Please check your request and try again.",
                    error: "FailedDeleteBookError"
                });
            });
    }
}
