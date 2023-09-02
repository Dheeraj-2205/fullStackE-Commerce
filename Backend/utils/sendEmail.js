const nodemailer = require("nodemailer");

const sendEmail = async (options) =>{
    const transporter = nodemailer.createTransport({
        host : process.env.SMPT_HOST,
        port : process.env.SMPT_PORT,
        auth : { 
            user : process.env.SMPT_MAIL,
            pass : process.env.SMPT_PASSWORD
        }
    });

    const mailOption = {
        from : process.env.SMPT_MAIL,
        to : options.email,
        subject : options.subject,
        text : options.message
    }
    await transporter.sendMail(mailOption);
  
    
}

// exports.resetPassword = Asynchandler(async (req, res, next) => {
//     // creating token hash
//     const resetPasswordToken = crypto
//       .createHash("sha256")
//       .update(req.params.token)
//       .digest("hex");
    
//     const user = await User.findOne({
//       resetPasswordToken ,
//       resetPasswordExpire: { $gt: Date.now() },
//     });
  
//     if (!user) {
//       return next(
//         new ErrorHandler(
//           "Reset Password Token is invalid or has been expired",
//           400
//         )
//       );
//     }
  
//     if (req.body.password !== req.body.confirmPassword) {
//       return next(new ErrorHandler("Password does not password", 400));
//     }
  
//     user.password = req.body.password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
  
//     await user.save();
  
//     sendToken(user, 200, res);
// });



module.exports = sendEmail;