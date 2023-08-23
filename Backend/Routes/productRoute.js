const express= require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct } = require("../Controllers/getAllProduct");

const router = express.Router();

router.route("/products").get(getAllProducts)
router.route("/product/create").post(createProduct)
router.route("/product/:id").put(updateProduct)
router.route("/product/:id").delete(deleteProduct)
module.exports = router;