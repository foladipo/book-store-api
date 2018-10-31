import express from "express";

const usersRoute = express.Router();

usersRoute.route("/").all((req, res) => {
    res.send("You got to the Users route!");
});

export default usersRoute;
