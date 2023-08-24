const express = require("express");
const product = require("./Routes/productRoute.js");
const app = express();
const errorHandler = require ("./middleware/error.js");

app.use(express.json());

app.use("/mern", product);


// middleware for error Handling

app.use(errorHandler)

module.exports = app;