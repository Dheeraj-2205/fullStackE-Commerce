const express = require("express");

const router = express.Router();

const { Authentication, authorizeRole } = require("../middleware/auth");
const { newOrder } = require("../Controllers/orderController");

router.route("/order/create").post(Authentication, newOrder);
module.exports = router;