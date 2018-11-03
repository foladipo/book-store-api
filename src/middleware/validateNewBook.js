import { DateTime } from "luxon";

import hasMinimumLength from "../util/hasMinimumLength";

/**
 * @name validateNewBook
 * @function validateNewBook
 * @description Checks that a request contains all the data necessary for
 * creating a new book.
 * @param {Request} req - data about the request sent to this middleware.
 * @param {Response} res - the response to be sent to the client.
 * @param {Function} next - the next middleware in Express' call stack.
 * @return {void}
 */
export default function validateNewBook(req, res, next) {
    const reqBody = req.body;
    const { title } = reqBody;
    if (!hasMinimumLength(title, 2)) {
        res.status(400).json({
            message: "Sorry, every new book must have a title that has at least 2 non-whitespace characters.",
            error: "InvalidNewBookTitleError"
        });
        return;
    }

    const { author } = reqBody;
    if (!hasMinimumLength(author, 2)) {
        res.status(400).json({
            message: "Sorry, the name of the author of every new book must have at least 2 non-whitespace characters.",
            error: "InvalidNewBookAuthorError"
        });
        return;
    }

    const { publicationDate } = reqBody;
    const isValidPublicationDate = DateTime
        .fromISO(publicationDate, { locale: "en-GB" })
        .isValid;
    if (typeof publicationDate !== "string" || !isValidPublicationDate) {
        res.status(400).json({
            message: "Sorry, new books must have a valid publication date in the format YYYY-MM-DD e.g 1915-06-22.",
            error: "InvalidNewBookPublicationDateError"
        });
        return;
    }

    const { genres } = reqBody;
    if (genres) {
        const isGenresStringArray = Array.isArray(genres) &&
            genres.every(genre => typeof genre === "string");
        if (!isGenresStringArray) {
            res.status(400).json({
                message: "Error. The 'genres' field is optional when adding a new book, but if specified, it must be an array of strings.",
                error: "InvalidNewBookGenresError"
            });
            return;
        }
    }

    const { isPrivate } = reqBody;
    if (typeof isPrivate !== "undefined" && typeof isPrivate !== "boolean") {
        res.status(400).json({
            message: "Error. New books are private by default. If you want to change that, you have to supply a boolean value in the 'isPrivate' field.",
            error: "InvalidNewBookIsPrivateError"
        });
        return;
    }

    next();
}
