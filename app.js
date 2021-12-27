const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const app = express();
const port = process.env.PORT || 3000;

// passport config
require("./config/passport")(passport);

// DB config
const db = require("./config/keys").MongoURI;

// connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

// css img js
app.use("/", express.static("public"));
app.use("/users", express.static("public"));
app.use("/ngos", express.static("public"));

// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

// express session middleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// connect flash
app.use(flash());

// global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/ngos", require("./routes/ngos"));

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
