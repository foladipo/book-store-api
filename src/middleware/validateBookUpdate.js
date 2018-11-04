import { DateTime } from "luxon";

import hasMinimumLength from "../util/hasMinimumLength";

/**
 * @name validateBookUpdate
 * @function validateBookUpdate
 * @description Checks that a request to update a book contains valid
 * data for the update.
 * @param {Request} req - data about the request sent to this middleware.
 * @param {Response} res - the response to be sent to the client.
 * @param {Function} next - the next middleware in Express' call stack.
 * @return {void}
 */
export default function validateBookUpdate(req, res, next) {
    const reqBody = req.body;
    const { title } = reqBody;
    if (title) {
        if (typeof title !== "string" || !hasMinimumLength(title, 2)) {
            res.status(400).json({
                message: "Sorry, a book's title must have at least 2 non-whitespace characters.",
                error: "InvalidBookUpdateTitleError"
            });
            return;
        }
    }

    const { author } = reqBody;
    if (author) {
        if (typeof author !== "string" || !hasMinimumLength(author, 2)) {
            res.status(400).json({
                message: "Sorry, the name of a book's author must have at least 2 non-whitespace characters.",
                error: "InvalidBookUpdateAuthorError"
            });
            return;
        }
    }

    const { publicationDate } = reqBody;
    if (publicationDate) {
        const isValidPublicationDate = DateTime
            .fromISO(publicationDate, { locale: "en-GB" })
            .isValid;
        if (typeof publicationDate !== "string" || !isValidPublicationDate) {
            res.status(400).json({
                message: "Sorry, updates to a book's publication date must be a string in the format YYYY-MM-DD e.g 1915-06-22.",
                error: "InvalidBookUpdatePublicationDateError"
            });
            return;
        }
    }

    const { genres } = reqBody;
    if (genres) {
        const isGenresStringArray = Array.isArray(genres) &&
            genres.every(genre => typeof genre === "string");
        if (!isGenresStringArray) {
            res.status(400).json({
                message: "Error. Changes to the 'genres' field of a book must be an array of strings or it must be an empty array.",
                error: "InvalidBookUpdateGenresError"
            });
            return;
        }
    }

    const { isPrivate } = reqBody;
    if (typeof isPrivate !== "undefined" && typeof isPrivate !== "boolean") {
        res.status(400).json({
            message: "Error. To change whether a book is private to you or public to everyone, you must supply a boolean value.",
            error: "InvalidBookUpdateIsPrivateError"
        });
        return;
    }

    next();
}
