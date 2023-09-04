const express = require("express");
const { register, loginUser, logout, forgetPassword, resetPassword, getUserDetails, updatePassword, updateProfile } = require("../Controllers/userController");
const { Authentication } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(loginUser);
router.route("/me").get(Authentication,getUserDetails)
router.route("me/password/update").post(Authentication,updatePassword)
router.route("/me/update/profile").put(Authentication,updateProfile)
router.route("/forget/password").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);

module.exports = router