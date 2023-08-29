
const asyncError = require("../middleware/asyncError.js");
const Asynchandler = require("../middleware/asyncError.js");
const User = require ("../Models/userModel.js");
const ErrorHandler = require("../utils/errorHandling.js");
const sendToken = require("../utils/jwtToken.js");

// register

exports.register = Asynchandler(async(req,res,next)=>{
    const {name,email,password } = req.body;

    const user = await User.create({
        name ,email ,password,
        avatar :{
            public_id : "Not yet",
            url : "profile pic url "
        }
    })
    sendToken(user,201,res);
});

// Login

exports.loginUser = Asynchandler(async(req,res,next)=>{
    const {email,password } = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email And Password", 401))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Please Enter Email And Password", 401));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if(!isPasswordMatch){
        return next(new ErrorHandler("Please Enter Valid Email And Password",401));
    }

    sendToken(user,200,res);

})

// logout

exports.logout = Asynchandler (async(req,res,next)=>{
    res.cookie("token", null ,{
        httpOnly : true,
        expires : new Date(Date.now())
    })
    res.status(200).json({
        success: true,
        message : "Logout Successfully"

    })
})
