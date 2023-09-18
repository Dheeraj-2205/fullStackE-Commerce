const asyncError = require("../middleware/asyncError");
const ErrorHandler = require("../utils/errorHandling");
const jwt = require('jsonwebtoken');
const User = require('../Models/userModel.js');

exports.Authentication = asyncError(async(req,res,next) =>{

    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please Login To Access The Resource", 401));
    }
    const decodedData = jwt.verify(token,process.env.SECRET_KEY);

    req.user = await User.findById(decodedData.id);

    next();
    
})

// exports.authorizeRoles = (...roles) =>{
//     return (req,res,next) =>{
//         if(!roles.includes(req.user.role)){
//             return next(new ErrorHandler(`Role ${req.user.role} is not allowed `, 403));
//         }
//         next();
//     }
// }

exports.authorizeRole = (...role) =>{
    return (req,res,next) =>{
        if(!role.includes(req.user.role)){
            next(new ErrorHandler(`you are user not admin`));
        }
        next();
    }
}