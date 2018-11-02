import isValidEmail from "../util/isValidEmail";
import isValidName from "../util/isValidName";
import isValidPassword from "../util/isValidPassword";

/**
 * @name validateSignUpData
 * @function validateSignUpData
 * @description Checks that all the data required to create a new account
 * (first name, password etc) are present in a sign up request and that
 * they are valid (e.g a valid email address is to be used as an email).
 * @param {Request} req - data about the HTTP request.
 * @param {Response} res - data and methods for the HTTP response that will be
 * sent to the requester.
 * @param {Function} next - the next middleware in Express' call stack.
 * @returns {void}
 */
export default function validateSignUpData(req, res, next) {
    const reqBody = req.body;

    const firstName = reqBody.firstName;
    if (firstName) {
        if (!isValidName(firstName)) {
            res.status(400)
                .json({
                    message: "Please enter a first name with at least two non-whitespace characters.",
                    error: "InvalidFirstNameError"
                });
            return;
        }
    } else {
        let errorType = "MissingFirstNameError";
        const message = "Please enter a first name with at least two non-whitespace characters.";
        if (firstName === "") {
            errorType = "EmptyFirstNameError";
        }
        res.status(400)
            .json({
                message,
                error: errorType
            });
        return;
    }

    const lastName = reqBody.lastName;
    if (lastName) {
        if (!isValidName(lastName)) {
            res.status(400)
                .json({
                    message: "Please enter a last name with at least two non-whitespace characters.",
                    error: "InvalidLastNameError"
                });
            return;
        }
    } else {
        let errorType = "MissingLastNameError";
        const message = "Please enter a last name with at least two non-whitespace characters.";
        if (lastName === "") {
            errorType = "EmptyLastNameError";
        }
        res.status(400)
            .json({
                message,
                error: errorType
            });
        return;
    }

    const username = reqBody.username;
    if (username) {
        if (!isValidEmail(username)) {
            res.status(400)
                .json({
                    message: "Please enter a valid email.",
                    error: "InvalidUsernameError"
                });
            return;
        }
    } else {
        let errorType = "MissingUsernameError";
        const message = "Please enter a valid email.";
        if (username === "") {
            errorType = "EmptyUsernameError";
        }
        res.status(400)
            .json({
                message,
                error: errorType
            });
        return;
    }

    const password = reqBody.password;
    const DEFAULT_PASSWORD_ERROR_MESSAGE = "Please enter a strong password to sign up. Such a password must be at least 8 characters long and contain one lowercase letter, one uppercase letter, one number and one symbol/special character.";
    if (password) {
        if (!isValidPassword(password)) {
            res.status(400)
                .json({
                    message: DEFAULT_PASSWORD_ERROR_MESSAGE,
                    error: "InvalidPasswordError"
                });
            return;
        }
    } else {
        let errorType = "MissingPasswordError";
        if (password === "") {
            errorType = "EmptyPasswordError";
        }
        res.status(400)
            .json({
                message: DEFAULT_PASSWORD_ERROR_MESSAGE,
                error: errorType
            });
        return;
    }

    next();
}
