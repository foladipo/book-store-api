import express from "express";

import { UsersController } from "../controllers/";

const usersRoute = express.Router();
usersRoute.route("/signUp").all(UsersController.signUp);
usersRoute.route("/").all((req, res) => {
    res.send("You got to the Users route!");
});

export default usersRoute;
