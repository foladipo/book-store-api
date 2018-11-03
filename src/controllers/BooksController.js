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
        const { decodedUserProfile } = req;
        res.json({
            message: "You have gotten to the add new book route!",
            decodedUserProfile
        });
    }
}
