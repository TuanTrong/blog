var express = require("express");
var categoryController = require("../controllers/category");

var router = express.Router({
  mergeParams: true
});

router
  .route("/")
  .get(categoryController.getAllCategory)
  .post(categoryController.insertCategory);

router
  .route("/:id")
  .get(categoryController.findCategoryById)
  .put(categoryController.updateCategoryById)
  .delete(categoryController.deleteCategoryById);

module.exports = router;
