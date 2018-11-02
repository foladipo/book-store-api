import isValidEmail from "../util/isValidEmail";
import isValidPassword from "../util/isValidPassword";

/**
 * @name validateLoginRequest
 * @function validateLoginRequest
 * @description Checks that the data required is present in a login request.
 * @param {Request} req - data about the HTTP request.
 * @param {Response} res - data and methods for the HTTP response that will be
 * sent to the requester.
 * @param {Function} next - the next middleware in Express' call stack.
 * @returns {void}
 */
export default function validateLoginRequest(req, res, next) {
    const reqBody = req.body;

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
    const DEFAULT_PASSWORD_ERROR_MESSAGE = "This password cannot possibly be correct as it doesn't meet our security standards. We only allow passwords that are at least 8 characters long and contain one lowercase letter, one uppercase letter, one number and one symbol/special character.";
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
        let message = "Please supply a password as the password field is missing.";
        let errorType = "MissingPasswordError";
        if (password === "") {
            message = DEFAULT_PASSWORD_ERROR_MESSAGE;
            errorType = "EmptyPasswordError";
        }
        res.status(400)
            .json({
                message,
                error: errorType
            });
        return;
    }

    next();
}
