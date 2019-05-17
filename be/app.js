var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
var dotenv = require("dotenv");

var articleRouter = require("./routes/article");
var categoryRouter = require("./routes/category");
var seedDb = require("./controllers/seedDb");

dotenv.config();

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/articles", articleRouter);
app.use("/categories", categoryRouter);

mongoose
  .connect(process.env.MONGOLAB_URI, { useNewUrlParser: true })
  .then(_ => {
    seedDb(app);
  })
  .catch(err => {
    console.error(`Connection error: ${err}`);
  });

app.use((err, req, res, next) => {
  console.error(`ERROR STACK: ${err.stack}`);
  res.status(500).send("Something went wrong.");
});

module.exports = app;
