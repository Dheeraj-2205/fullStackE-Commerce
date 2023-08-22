const express = require("express");
const product = require("./Routes/productRoute.js");
const app = express();

app.use(express.json());

app.use("/mern", product);


module.exports = app;