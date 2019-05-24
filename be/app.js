const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");

const mongoose = require("./config/mongoose");
const redis = require("./config/redis");
const articleRouter = require("./routes/article");
const categoryRouter = require("./routes/category");
const userRouter = require("./routes/user");
const tokenRouter = require("./routes/token");

dotenv.config();

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
require("./config/passport");

app.use("/articles", articleRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);
app.use("/tokens", tokenRouter);

mongoose.initialize(app);
redis;

app.use((err, req, res, next) => {
  console.error(`ERROR: ${err}`);
  res.status(500).send(err.message);
});

module.exports = app;
