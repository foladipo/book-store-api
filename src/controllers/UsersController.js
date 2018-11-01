import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

import { Users } from "../models/";
/**
 * @class UsersController
 * @name UsersController
 * @description A collection of controllers for manipulating the Users model.
 */
export default class UsersController {
    /**
     * @name signUp
     * @method signUp
     * @description A controller used to create new user accounts.
     * @param {Object} req - data about the request sent to this controller.
     * @param {Object} res - the response from this controller.
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
}
