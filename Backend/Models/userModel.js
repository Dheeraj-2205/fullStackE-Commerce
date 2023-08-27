const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
const user = mongoose.model("User", userSchema);

userSchema.pre("save", async function (next){
    console.log("object");
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password , 10);
})


module.exports = user