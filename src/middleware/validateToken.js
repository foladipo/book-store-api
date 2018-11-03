import JWT from "jsonwebtoken";

/**
 * @name validateToken
 * @function validateToken
 * @description Checks that a request has a valid token.
 * @param {Request} req - data about the request sent to this middleware.
 * @param {Response} res - the response to be sent to the client.
 * @param {Function} next - the next middleware in Express' call stack.
 * @return {void}
 */
export default function validateToken(req, res, next) {
    const token = req.headers["x-book-store-authentication"];
    if (token === undefined) {
        res.status(400)
            .json({
                message: "We don't recognize you. Please send your authentication token with the next request.",
                error: "MissingTokenError"
            });
        return;
    }
    if (token === "") {
        res.status(400)
            .json({
                message: "We don't recognize you. Please send your authentication token with the next request.",
                error: "EmptyTokenError"
            });
        return;
    }

    let userProfile;
    try {
        userProfile = JWT.verify(token, process.env.JWT_PRIVATE_KEY);
    } catch (err) {
        const errorType = err.name;
        if (errorType === "TokenExpiredError") {
            res.status(401)
                .json({
                    message: "Your authentication token has expired. Please log in to get a new one.",
                    error: "ExpiredTokenError"
                });
        } else {
            res.status(401)
                .json({
                    message: "You don't have a valid authentication token. Please log in to get a new one.",
                    error: "InvalidTokenError"
                });
        }
        return;
    }

    req.decodedUserProfile = userProfile;
    next();
}
