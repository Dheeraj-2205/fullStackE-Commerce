
const { send } = require("process");
const Asynchandler = require("../middleware/asyncError.js");
const User = require ("../Models/userModel.js");
const ErrorHandler = require("../utils/errorHandling.js");
const sendToken = require("../utils/jwtToken.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require('crypto');
const asyncError = require("../middleware/asyncError.js");
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
        return next(new ErrorHandler("User does Not exists", 401));
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


exports.forgetPassword = Asynchandler(async(req,res,next)=>{
    const user= await User.findOne({email : req.body.email});

    if(!user){
        return next(new ErrorHandler("User Not Found" , 404));
    }
    
    // getReset Password tOken
    const resetToken = await user.getResetPasswordToken();

    await user.save({validateBeforeSave: false });

    const resetPasswordUrl = `<a>${req.protocol}://${req.get("host")}/mern/password/reset/${resetToken}</a>`

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email
     then please ignore it`;

    try {
        await sendEmail ({
            email : user.email,
            subject : `Ecommerce Password Reset`,
            message
        })
        res.status(200).json({
            success : true,
            message : `Email sent ${user.email} successfully`
        })
    } catch (error) {
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        await user.save({validateBeforeSave :false})

        return next(new ErrorHandler (error.message , 500));
    }

})

exports.resetPassword = Asynchandler(async(req,res,next)=>{
    const {token} = req.params;
    const resetPasswordToken = crypto.
        createHash("sha256")
        .update(token)
        .digest("hex")
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now()}
    });
    console.log(user);
    if(!user){
        return next(new ErrorHandler("Token is invalid or has been expired", 400));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler(" Password did not match",400));
    }
    user.password = req.body.password
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;

    await user.save();

    sendToken(user,200,res);
})

// get user details
exports.getUserDetails = Asynchandler(async(req,res,next)=>{
    const user = await User.findById(req.user.id);      //the route only whose login first
    
    res.status(200).json({
        success : true,
        user
    })
}) 


exports.updatePassword = Asynchandler(async(req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);


    if(!isPasswordMatch){
        return next(new ErrorHandler(`oldPassword is invalid`, 400));
    };

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler(`Password does not match`, 400));
    };

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user,500,res);

    // 3 key value pair in post method
});

exports.updateProfile = Asynchandler(async(req,res,next)=>{
    const newUserData = {
        name :req.body.name,
        email :req.body.email,
    }
// cloudinary add remaining
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new : true,
        runValidators : true,
        useFindAndModify : false
    })

    res.status(200).json({
        success : true,
    })
})

// get all users admin

exports.getAllUser = Asynchandler(async(req,res,next)=>{
    const users = await User.find();
    res.status(200).json({
        success : true,
        users
    })
})

// get Single  user by admin

exports.getSingleUser = Asynchandler(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler("User does not exist in this id " + req.params.id), 400);
    }

    res.status(200).json({
        success : true,
        user
    })
})

//  update user by admin

exports.updateProfile = Asynchandler(async(req,res)=>{

    const newUserData = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role
    }
    const user =await User.findByIdAndUpdate(req.params.id, newUserData);

    res.status(200).json({
        success : true,
    })

});