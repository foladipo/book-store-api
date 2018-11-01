import express from "express";

import { UsersController } from "../controllers/";
import validateSignUpData from "../middleware/validateSignUpData";

const usersRoute = express.Router();
usersRoute.route("/signUp").post(validateSignUpData, UsersController.signUp);
usersRoute.route("/").all((req, res) => {
    res.send("You got to the Users route!");
});

export default usersRoute;
