const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const passport = require("passport");

// login page
router.get("/login", (req, res) => {
  res.render("ngologin");
});

// register page
router.get("/register", (req, res) => {
  res.render("ngoregister");
});

module.exports = router;
