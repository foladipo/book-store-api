import express from "express";
import bodyParser from "body-parser";

import indexRoute from "./routes";

const app = express();

app.use(bodyParser.json());

app.use("/api/v1", indexRoute);

app.all("/", (req, res) => {
    res.send("<pre>Welcome to the Book Store!</pre>");
});

export default app;
