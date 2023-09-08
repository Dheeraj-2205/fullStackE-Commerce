const express = require("express");

const router = express.Router();

const { Authentication, authorizeRole } = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrders, getAllOrder, updateOrder, deleteOrder } = require("../Controllers/orderController");

router.route("/order/create").post(Authentication, newOrder);
router.route("/order/:id").get(Authentication,authorizeRole("admin"),getSingleOrder);
router.route("/orders/me").get(Authentication,myOrders)
router.route("/admin/orders").get(Authentication,authorizeRole("admin"),getAllOrder);
router.route("/admin/order/:id").put(Authentication,authorizeRole("admin"),updateOrder)
.delete(Authentication,authorizeRole("admin"),deleteOrder);
module.exports = router;