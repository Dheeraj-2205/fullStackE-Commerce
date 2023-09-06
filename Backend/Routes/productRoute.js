const express= require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProdctReview } = require("../Controllers/getAllProduct");
const { Authentication, authorizeRole } = require("../middleware/auth.js");

const router = express.Router();


router.route("/products").get(getAllProducts)
router.route("/product/create").post(Authentication,authorizeRole("admin"),createProduct)
router.route("/product/:id")
.put(Authentication,authorizeRole("admin"),updateProduct)
.delete(Authentication,authorizeRole("admin"),deleteProduct)
.get(getProductDetails);
router.route("/review").put(Authentication,createProductReview);
router.route("/reviews").get(getProdctReview).delete(Authentication,deleteProduct)


module.exports = router;