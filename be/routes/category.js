var express = require("express");
var categoryController = require("../controllers/category");

var router = express.Router({
  mergeParams: true
});

router.get("/", categoryController.getAllCategory);

router
  .route("/:id")
  .get(categoryController.findCategoryById)
  .post(categoryController.upsertCategoryById)
  .delete(categoryController.deleteCategoryById);

module.exports = router;
