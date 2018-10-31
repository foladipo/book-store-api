
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
     * @param { Object } req - data about the request to this controller.
     * @param { Object} res - the response from this controller.
     * @returns { void }
     */
    static signUp(req, res) {
        res.json({ message: "You have signed up." });
    }
}
