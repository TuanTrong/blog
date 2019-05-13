var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");

var articleRouter = require("./routes/article");
var categoryRouter = require("./routes/category");
var seedDb = require("./controllers/seedDb");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/article", articleRouter);
app.use("/category", categoryRouter);

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster1-z55js.mongodb.net/test?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(_ => {
    seedDb(app);
  })
  .catch(err => {
    console.error(`Connection error: ${err}`);
  });

module.exports = app;
