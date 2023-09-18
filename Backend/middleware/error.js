const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandling.js");


module.exports = (err,req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // mongodb Wrong id
    if(err.name === "CastError"){
        const message =  `Resource is not found Invalid : ${err.path}`;
        err = new ErrorHandler(message,400);
    }

    // mongoose  duplicate key error

    // if(err.code == 11000){
    //     const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
    //     err = new ErrorHandler(message,400);
    // }

    
    if(err.code == 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message,500);
    }

    if(err.name === JsonWebTokenError){
        const message = `Json web token is invalid`;
        err = new ErrorHandler(message ,400);
    }

    if(err.name === TokenExpiredError){
        const message = "JsonWebToken is expire";
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success : false,
        error : err.message
    })
}


