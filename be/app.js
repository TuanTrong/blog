const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const redis = require("redis");
const mongoose = require("mongoose");

const seedDb = require("./controllers/seedDb");
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

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(_ => {
    seedDb(app);
    console.log("Mongoose client connected.");
  })
  .catch(err => {
    console.error(`Connection error: ${err}`);
  });

const redisClient = redis
  .createClient(process.env.REDIS_URI)
  .on("connect", () => {
    console.log("Redis client connected.");
  })
  .on("error", err => {
    console.error(err);
  });

require("./controllers/article").setClient(redisClient);
require("./controllers/category").setClient(redisClient);

app.use((err, req, res, next) => {
  console.error(`ERROR: ${err}`);
  res.status(500).send(err.message);
});

module.exports = app;
