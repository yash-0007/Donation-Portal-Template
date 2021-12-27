const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const passport = require("passport");
const { ensureUserAuthenticated } = require("../config/auth");

// user model
const User = require("../models/User");

// login page
router.get("/login", (req, res) => {
  res.render("userlogin");
});

// register page
router.get("/register", (req, res) => {
  res.render("userregister");
});

// register handle
router.post("/register", (req, res) => {
  const {
    name,
    email,
    password,
    gender,
    age,
    contactNumber,
    bloodGroup,
    address,
  } = req.body;
  let errors = [];
  // check required fields
  if (
    !name ||
    !email ||
    !password ||
    !gender ||
    !age ||
    !contactNumber ||
    !bloodGroup ||
    !address
  ) {
    errors.push({ msg: "Please fill in all the fields" });
  }
  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      gender,
      age,
      contactNumber,
      bloodGroup,
      address,
    });
  } else {
    // validation passed
    User.findOne({ email: email }).then((user) => {
      if (user) {
        // user exists
        errors.push({ msg: "Email is already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          gender,
          age,
          contactNumber,
          bloodGroup,
          address,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          gender,
          age,
          contactNumber,
          bloodGroup,
          address,
        });

        // hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // set password to hash
            newUser.password = hash;
            // save user
            newUser
              .save()
              .then((user) => {
                req.flash("success_msg", "You are now registered");
                res.redirect("/users/login");
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  }
});

// login handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local-user", {
    successRedirect: "/users/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

// dashboard
router.get("/dashboard", ensureUserAuthenticated, (req, res) => {
  res.render("userdashboard", {
    name: req.user.name,
  });
});

// logout handle
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});

module.exports = router;
