var createError = require("http-errors");
var express = require("express");
const mongoose = require("mongoose");
var path = require("path");
const { MongoURI } = require("./dbSchema");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var vegetablesRouter = require("./routes/vegetables");
const dotenv = require("dotenv");
require("./config/passport")(passport);
const session = require("express-session");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/vegetables", vegetablesRouter);
dotenv.config();
mongoose.connect(process.env.MONGO_URL);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
