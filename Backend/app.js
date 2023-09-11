const express = require("express");
const product = require("./Routes/productRoute.js");
const user = require("./Routes/userRoute.js");
const order = require("./Routes/orderRoute.js")
const app = express();
const errorHandler = require ("./middleware/error.js");
const cookieParser = require("cookie-parser");


// const cors = require("cors");
// app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use(cookieParser());

app.use("/mern", product);
app.use("/mern", user)
app.use("/mern", order);


// middleware for error Handling

app.use(errorHandler)

module.exports = app;