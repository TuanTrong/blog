var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster1-z55js.mongodb.net/test?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(_ => {
    console.log("Connected to MongoDB on cloud.");
  })
  .catch(err => {
    console.error(`Connection error: ${err}`);
  });

module.exports = app;
