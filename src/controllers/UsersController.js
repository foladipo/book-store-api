import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

import { Users } from "../models/";

dotenv.config();

/**
 * @class UsersController
 * @name UsersController
 * @description A collection of controllers for manipulating the Users model.
 */
export default class UsersController {
    /**
     * @name signUp
     * @method signUp
     * @description A controller used to create new user accounts. If
     * successful, it sends a response with a JWT token for further
     * interactions with this app.
     * @param {Request} req - data about the request sent to this controller.
     * @param {Response} res - the response from this controller.
     * @returns {void}
     */
    static signUp(req, res) {
        const reqBody = req.body;
        const { firstName, lastName, username, password } = reqBody;

        /*
        The Users.username column does have the UNIQUE constraint, but
        Sequelize returns a generic SequelizeUniqueConstraintError,
        without specifying the errant column/part of the sign up data.
        So, I decided to explicitly handle it myself.
        */
        Users
            .findOne({
                where: {
                    username
                }
            })
            .then((user) => {
                if (user) {
                    res.status(400)
                        .json({
                            message: "This email is taken. Please use another one for your username.",
                            error: "UsernameAlreadyTakenError"
                        });
                } else {
                    const saltLength =
                        Number.parseInt(process.env.PASSWORD_SALT_LENGTH, 10);
                    const hashedPassword =
                        bcrypt.hashSync(password, saltLength);
                    const firstNameNoMultipleWhitespace = firstName.trim().replace(/(\s{2,})/, " ");
                    const lastNameNoMultipleWhitespace = lastName.trim().replace(/(\s{2,})/, " ");
                    Users
                        .create({
                            firstName: firstNameNoMultipleWhitespace,
                            lastName: lastNameNoMultipleWhitespace,
                            username,
                            password: hashedPassword
                        })
                        .then((createdUser) => {
                            const userDetails = {
                                id: createdUser.id,
                                username: createdUser.username,
                                firstName: createdUser.firstName,
                                lastName: createdUser.lastName
                            };
                            const token = JWT.sign(userDetails, process.env.JWT_PRIVATE_KEY, { expiresIn: "3d" });
                            res.status(200).json({
                                message: "Signed up successfully.",
                                token
                            });
                        });
                }
            });
    }


    /**
     * @name login
     * @method login
     * @description Logs a user (by sending a JWT token) in if they supply
     * the right info. Sends an error response otherwise.
     * @param {Request} req - Data about the HTTP request sent to
     * this controller.
     * @param {Response} res - Data sent back to the user e.g HTTP status
     * codes, JSON responses etc.
     * @return {void}
     */
    static login(req, res) {
        const reqBody = req.body;
        const username = reqBody.username;
        const password = reqBody.password;
        const lowerCaseUsername = username.toLowerCase();
        const trimmedUsername = lowerCaseUsername.trim();
        Users.findOne({
            where: {
                username: trimmedUsername
            }
        }).then((user) => {
            if (user) {
                const storedPasswordHash = user.password;
                const isCorrectPassword =
                    bcrypt.compareSync(password, storedPasswordHash);
                if (isCorrectPassword) {
                    const userDetails = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName
                    };
                    const token = JWT.sign(userDetails, process.env.JWT_PRIVATE_KEY, { expiresIn: "3d" });
                    res.status(200).json({
                        message: "Logged in successfully.",
                        token
                    });
                    return;
                }
            }
    
            res.status(403)
                .json({
                    message: "Nope. Those login details are incorrect. Please correct your username and/or password and try again.",
                    error: "IncorrectLoginDetailsError"
                });
        });
    }
}
