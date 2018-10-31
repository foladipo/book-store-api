import express from "express";

import usersRoute from "./usersRoute";

const indexRoute = express();
indexRoute.use("/users", usersRoute);

indexRoute.use("/", (req, res) => {
    res.json({
        message: "Welcome to the Book Store API!"
    });
});

export default indexRoute;
