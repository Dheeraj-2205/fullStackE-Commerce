// const ErrorHandler = require("../utils/errorHandling.js");


// module.exports = (err,req,res,next) =>{
//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || "Internal Server Error",

//     res.status(err.statusCode).json({
//         success : false,
//         error : err
//     })
// }


module.exports = (err,req,res,next) =>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Chala jaa"

    res.status(500).json({
        success : false,
        error : err
    })
}