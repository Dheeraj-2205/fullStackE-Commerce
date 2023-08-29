const express = require("express");
const product = require("./Routes/productRoute.js");
const app = express();
const errorHandler = require ("./middleware/error.js");
const router = require("./Routes/userRoute.js");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/mern", product);
app.use("/mern", router)


// middleware for error Handling

app.use(errorHandler)

module.exports = app;