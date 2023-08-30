const express = require("express");
const { register, loginUser, logout, forgetPassword } = require("../Controllers/userController");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(loginUser);
router.route("/forget/password").post(forgetPassword);
router.route("/logout").get(logout);

module.exports = router