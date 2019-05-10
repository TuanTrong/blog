var express = require("express");
var router = express.Router();

/* GET articles. */
router.get("/", function(req, res, next) {
  res.send("This is data from the Express server!");
});

module.exports = router;
