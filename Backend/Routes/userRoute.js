const express = require("express");
const { register } = require("../Controllers/userController");

const router = express.Router();

router.route("/register").post(register);

module.exports = router