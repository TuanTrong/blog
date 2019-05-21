const express = require("express");
const userController = require("../controllers/user");

const router = express.Router({
  mergeParams: true
});

router.route("/").post(userController.register);

module.exports = router;
