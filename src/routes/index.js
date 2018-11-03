import express from "express";

import booksRoute from "./booksRoute";
import usersRoute from "./usersRoute";

const indexRoute = express();
indexRoute.use("/books", booksRoute);
indexRoute.use("/users", usersRoute);

indexRoute.use("/", (req, res) => {
    res.json({
        message: "Welcome to the Book Store API!"
    });
});

export default indexRoute;
