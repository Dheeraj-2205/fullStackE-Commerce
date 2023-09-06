const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please Enter Product  Name"] 
    },
    description : {
        type : String,
        required : [ true , "Give Some Description About The Product"]
    },
    price : {
        type : Number,
        required : [true, "Please Enter Some Prize"],
        maxLength : [7, "Only 7 digit allowed"]
    },
    rating:{
        type : Number,
        default : 0
    },
    image :[
        {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        }

    ],
    category : {
        type : String,
        required : [true, "Please Enter Product Category"]
    },
    Stock : {
        type : Number,
        required : [true, "Provide The Quantity"],
        default : 1

    },
    numsOfReviews : {
        type : Number,
        default : 0,
    },
    review :[
        {
            user :{
                type : mongoose.Schema.ObjectId,
                ref : "user",
                required : true
            },
            name :  {
                type : String,
                required : true
            },
            rating : {
                type : Number, 
                required : true
            },
            comment : {
                type : String,
                required : true
            }
        }
    ],
    
    createdAt : {
        type : Date,
        default : Date.now
    }
})
const productModel = mongoose.model("Product",productSchema)
module.exports = productModel