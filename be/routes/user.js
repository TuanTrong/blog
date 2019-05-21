const express = require("express");
const userController = require("../controllers/user");

const router = express.Router({
  mergeParams: true
});

router.route("/").post(userController.login);

module.exports = router;
