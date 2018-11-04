import express from "express";

import { UsersController } from "../controllers/";
import validateSignUpRequest from "../middleware/validateSignUpRequest";
import validateLoginRequest from "../middleware/validateLoginRequest";
import validateToken from "../middleware/validateToken";

const usersRoute = express.Router();
usersRoute.route("/signUp").post(validateSignUpRequest, UsersController.signUp);
usersRoute.route("/login").post(validateLoginRequest, UsersController.login);
usersRoute.route("/mybooks").get(validateToken, UsersController.getMyBooks);
usersRoute.route("/").all((req, res) => {
    res.send("You got to the Users route!");
});

export default usersRoute;
