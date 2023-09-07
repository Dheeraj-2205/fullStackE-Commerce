const Order = require("../Models/orderModel");
const ErrorHander = require("../utils/errorHandling");
const Product = require("../Models/productModel.js");
const AsyncError = require("../middleware/asyncError");

exports.newOrder = AsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    paidAt,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    paidAt,
    taxPrice,
    shippingPrice,
    totalPrice,
    PaidAt : Date.now(),
    user : req.user._id
  })

  res.status(201).json({
    success : true,
    order
  })
});


// get Single Order

exports.getSingleOrder = AsyncError(async(req,res,next)=>{

    const {id} = req.params;

    const order = await Order.findById(id).populate(
        "user", 
        "name email"
    );

    if(!order){
        return next(new ErrorHander("Order Not Found with this id", 404));
    };

    res.status(200).json({
        success : true,
        order
    })
})


