var express = require("express");
var articleController = require("../controllers/article");

var router = express.Router({
  mergeParams: true
});

router
  .route("/")
  .get(articleController.getAllArticle)
  .post(articleController.insertArticle);

router
  .route("/:id")
  .get(articleController.findArticleById)
  .put(articleController.updateArticleById)
  .delete(articleController.deleteArticleById);

module.exports = router;
