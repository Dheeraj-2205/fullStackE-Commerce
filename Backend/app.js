const express = require("express");
const product = require("./Routes/productRoute.js");
const user = require("./Routes/userRoute.js");
const order = require("./Routes/orderRoute.js")
const app = express();
const errorHandler = require ("./middleware/error.js");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3001', // Replace with your client's origin
    credentials: true,
  };
  
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));
app.use(fileUpload())

app.use("/mern", product);
app.use("/mern", user)
app.use("/mern", order);


// middleware for error Handling

app.use(errorHandler);
module.exports = app;