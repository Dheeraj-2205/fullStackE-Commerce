const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please Enter Your Name"],
        maxLength : [30 , "Name Cannot Exceed"],
        minLength : [4, "Name should have more than the 4 characters"]
    },
    email :{
        type : String,
        required : true,
        unique : true,
        validator : [validator.isEmail, "Please Enter Valid Email"]
    },
    password :{
        type : String,
        required : [true, "Please Enter Your Password"],
        minLength : [6, "Passowrd should have more than the 6 characters"],
        select : false
    },
    avatar : {
        public_id : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        }
    },
    role :{
        type : String,
        default : "user"
    },
    
    resetPasswordToken :String,
    resetPasswordExpire : Date

});


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password , 10);
});


//jwt token


userSchema.methods.getJwtToken = function () {
    return jwt.sign({id : this._id}, process.env.SECRET_KEY,{
        expiresIn : process.env.JWT_EXPIRE
    })
}

// Compare Password.


userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password,this.password)
}


// reset Password

// userSchema.methods.getResetPasswordToken = function (){
//     // generate token
//     const resetToken = crypto.randomBytes(20).toString("hex");

//     // Hashing and adding resetPasswordToken to userSchema
//     this.resetPasswordToken =crypto
//         .createHash("sha256")
//         .update(resetToken)
//         .digest("hex")

//     this.resetPasswordExpire = Date.now() + 15 * 60 *1000
// }

userSchema.methods.getResetPassword = function (){
    const token = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256")
        .update(token)
        .digest("hex")
    this.resetPasswordExpire = (Date.now() +  15 * 60 * 1000);
}

const user = mongoose.model("User", userSchema);
module.exports = user;