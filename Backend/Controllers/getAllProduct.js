const Product = require("../Models/productModel.js");
const ErrorHander = require("../utils/errorHandling");
const AsyncResolver = require("../middleware/asyncError.js");
//Create Product => admin routes
exports.createProduct = AsyncResolver(async (req, res, next) => {
  const create = await Product.create(req.body);
  res.status(201).json({
    success: true,
    message: "Product is Created Successfully ",
    create,
  });

});
// createData
exports.getAllProducts = AsyncResolver(async (req, res) => {
  const products = await Product.find();
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

exports.getProductDetails = async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id).exec();
  console.log(product);

  if (!product) {
    return next(new ErrorHander("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
};
