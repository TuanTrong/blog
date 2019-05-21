const express = require("express");
const passport = require("passport");
const categoryController = require("../controllers/category");

const router = express.Router({
  mergeParams: true
});

router
  .route("/")
  .get(categoryController.getAllCategory)
  .post(
    passport.authenticate("jwt", { session: false }),
    categoryController.insertCategory
  );

router.get("/:id/articles", categoryController.getAllArticleByCategory);

router
  .route("/:id")
  .get(categoryController.findCategoryById)
  .put(
    passport.authenticate("jwt", { session: false }),
    categoryController.updateCategoryById
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    categoryController.deleteCategoryById
  );

module.exports = router;
