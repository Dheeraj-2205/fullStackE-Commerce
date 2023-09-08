const express = require("express");

const router = express.Router();

const { Authentication, authorizeRole } = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders } = require("../Controllers/orderController");

router.route("/order/create").post(Authentication, newOrder);
router.route("/order/:id").get(Authentication,authorizeRole("admin"),getSingleOrder);
router.route("/orders/me").get(Authentication,myOrders)
module.exports = router;