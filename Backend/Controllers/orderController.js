const Order = require("../Models/orderModel");
const ErrorHander = require("../utils/errorHandling");
const Product = require("../Models/productModel.js");
const AsyncError = require("../middleware/asyncError");

exports.newOrder = AsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItem,
    paymentInfo,
    paidAt,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItem,
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
