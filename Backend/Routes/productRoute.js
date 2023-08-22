const express= require("express");
const { getAllProducts, createProduct } = require("../Controllers/getAllProduct");

const router = express.Router();

router.route("/products").get(getAllProducts)
router.route("/product/create").post(createProduct)
module.exports = router;