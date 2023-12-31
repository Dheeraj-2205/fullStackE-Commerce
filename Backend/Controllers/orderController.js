const Order = require("../Models/orderModel");
const ErrorHander = require("../utils/errorHandling");
const Product = require("../Models/productModel.js");
const AsyncError = require("../middleware/asyncError");
const ErrorHandler = require("../utils/errorHandling");

exports.newOrder = AsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    status,
    paidAt,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    status,
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


// get Single Order --admin

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

// get logged in order

exports.myOrders = AsyncError(async(req,res,next)=>{

    const orders = await Order.find({user : req.user._id});

    res.status(200).json({
        success : true,
        orders
    })

})

exports.getAllOrder = AsyncError(async(req,res)=>{
  const order = await Order.find();
  let total = 0;
  
  order.forEach((ele)=>{
    total += ele.totalPrice;
  })
  res.status(200).json({
    success : true,
    order,
    total
  })
})

// update order status  -- Admin
// ---p

exports.updateOrder = AsyncError(async(req,res,next)=>{
  const order = await Order.findById(req.params.id);

  if(!order){
    return next(new ErrorHander("Order is not found", 404));
  }

  if(order.orderStatus === "Delivered"){
    return next(new ErrorHandler("Order is already deliverd", 400));
  };
  order.orderItems.forEach(async (order)=>{
    await updateStock(order.product, order.quantity);
  });

  order.orderStatus = req.body.status;

  if(req.body.status === "Delivered"){
    order.deliveredAt = Date.now();
  }
  await order.save({validateBeforeSave : false});
  res.status(200).json({
    success : true,
    order
  })
})


async function updateStock (id,quantity){
  const product = await Product.findById(id);

  product.Stock  -= quantity;
  await product.save({validateBeforeSave : false})
}


// delete order

exports.deleteOrder = AsyncError(async(req,res,next)=>{
  const order = await Order.findById(req.params.id);
  
  if(!order){
    return next(new ErrorHander("Order is not found", 404));
  }
  await order.deleteOne();

  res.status(200).json({
    success : true,
    order

  })
})






