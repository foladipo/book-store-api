const express = require("express");

const app = express();

app.all("/", (req, res) => {
    res.send("Welcome to the Book Store!");
});

module.exports = app;
