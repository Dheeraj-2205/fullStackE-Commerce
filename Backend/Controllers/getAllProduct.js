const Product = require("../Models/productModel.js");

exports.createProduct = async(req,res,next) =>{
    try {
        const create = await Product.create(req.body);
        res.status(201).json({
            success : true,
            message : "Product is Created Successfully ",
            create
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error
        })
    }


}
exports.getAllProducts = (req,res) =>{
    res.status(200).json({
        message : "root is successfully"
    })
}