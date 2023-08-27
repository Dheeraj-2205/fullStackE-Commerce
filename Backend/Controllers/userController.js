const Asynchandler = require("../middleware/asyncError.js");
const User = require ("../Models/userModel.js");
const ErrorHandler = require("../middleware/error.js");

// register

exports.register = Asynchandler(async(req,res,next)=>{
    const {name,email,password } =req.body;

    const user = User.create({
        name ,email ,password,
        avatar :{
            public_id : "Not yet",
            url : "profile pic url "
        }
    })
    console.log(req.body);

    return res.status(201).json({
        success : true,
        user
    })



})