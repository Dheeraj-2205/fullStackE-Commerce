const Product = require("../Models/productModel.js");
const ErrorHander = require("../utils/errorHandling");
const AsyncResolver = require("../middleware/asyncError.js");
const ApiFeatures = require("../utils/apiFeature.js");
const Newidea = require("../utils/apiFeature.js");


//Create Product => admin routes


exports.createProduct = AsyncResolver(async (req, res, next) => {

  req.body.user = req.user.id;
  console.log(req.user.id);
  const create = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: "Product is Created Successfully ",
    create,
  });

});
// createData

exports.getAllProducts = AsyncResolver(async (req, res) => {

  // const productCount = await Product.countDocument();
  const perPage = 5;

  const apiFeature = new ApiFeatures(Product.find(),req.query)
  .search()
  .filter()
  .pagination(perPage);
  const products = await apiFeature.query

  res.status(200).json({
    success: true,
    products,
  });
});



//updateProduct  only for admin
exports.updateProduct = AsyncResolver(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById({ _id: id });
  if (!product) {
    return next(new ErrorHander("Product Not Found", 404));
  }
  product = await Product.findByIdAndUpdate({ _id: id }, req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = AsyncResolver(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHander("Product Not Found", 404));
  }
  await Product.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Delete the Product",
  });
});

exports.getProductDetails = AsyncResolver(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHander("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// my review

exports.createProductReview = AsyncResolver(async(req,res,next)=>{
  const {rating ,comment, productId}  = req.body;
  const review = {
    user : req.user._id,
    name : req.user.name,
    rating : Number(rating),
    comment,
  }

  const product = await Product.findById(productId);
  const isReview = product.review.find(
    (rev) =>rev.user.toString() === req.user._id.toString()
  )
  if(isReview){
    product.review.forEach(rev => {
      if((rev) =>rev.user.toString() === req.user._id.toString()){
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  }else{
    product.review.push(review);
    product.numsOfReviews = product.review.length
  }
  let average = 0;
  product.review.forEach(element => {
    average += element
  });

  product.rating = average / product.review.length;
  await product.save({validateBeforeSave : false});

  res.status(200).json({
    success : true
  })
});

// get all reviews of a product

exports.getProdctReview = AsyncResolver(async(req,res,next)=>{
  const product = await Product.findById(req.query.id);

  if(!product){
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success : true,
    reviews : product.review
  })

});

// delete review

exports.deleteProduct = AsyncResolver(async(req,res,next)=>{
  const product = await Product.findById(req.query.ProductId);

  if(!product){
    return next(new ErrorHander("Product Not Found", 404));
  };

  const reviews = product.review.filter(
    (rev) => rev._id.toString() !== rev.query.id.toString()
  )

  let avg = 0;

  reviews.forEach((rev)=>{
    avg += rev.rating
  })

  const rating = avg / reviews.length;

  const numsOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.ProductId,{reviews,rating,numsOfReviews}
    ,
    {
      new : true,
      runValidators : true,
      useFindAndModify : false 
    })
  res.status(200).json({
    success : true,
    reviews : product.review
  })

});
