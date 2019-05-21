const express = require("express");
const passport = require("passport");
const articleController = require("../controllers/article");

const router = express.Router({
  mergeParams: true
});

router
  .route("/")
  .get(articleController.getAllArticle)
  .post(
    passport.authenticate("jwt", { session: false }),
    articleController.insertArticle
  );

router
  .route("/:id")
  .get(articleController.findArticleById)
  .put(
    passport.authenticate("jwt", { session: false }),
    articleController.updateArticleById
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    articleController.deleteArticleById
  );

module.exports = router;
