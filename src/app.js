import express from "express";

const app = express();

app.all("/", (req, res) => {
    res.send("Welcome to the Book Store!");
});

export default app;
