const mongoose = require("mongoose");
const validator = require("validator");

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
        validator : [validator.isEmail]
    }

})