const mongoose = require("mongoose");
const seedDb = require("../controllers/seedDb");

function initialize(app) {
  mongoose
    .connect(process.env.MONGO_DOCKER_URI, { useNewUrlParser: true })
    .then(_ => {
      seedDb(app);
      console.log("Mongoose client connected.");
    })
    .catch(err => {
      console.error(`Connection error: ${err}`);
    });
}

module.exports = { initialize };
