const Product = require("../Models/productModel.js");
const ErrorHander = require("../utils/errorHandling");

//Create Product => admin routes
exports.createProduct = async (req, res, next) => {
  try {
    const create = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product is Created Successfully ",
      create,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// createData
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
};

//updateProduct  only for admin
exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById({ _id: id });
    if (!product) {
      return res.status(404).json({
        message: "Product Is Not Found",
        success: false,
      });
    }
    product = await Product.findByIdAndUpdate({ _id: id }, req.body);

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteProduct = async (req, res, next) => {
//   try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Delete the Product",
    });
//   } catch (error) {
//     res.status(500).json({
//       message: false,
//       error,
//     });
//   }
};

exports.getProductDetails = async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  console.log(product);

  if (!product) {
    return res.status(500).json({
        success : false,
        message : "Product Not Found"
    })
  }
  res.status(200).json({
    success: true,
    product,
  });
}
