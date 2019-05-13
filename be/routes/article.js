var express = require("express");
var articleController = require("../controllers/article");

var router = express.Router({
  mergeParams: true
});

router.get("/", articleController.getAllArticle);

router
  .route("/:id")
  .get(articleController.findArticleById)
  .post(articleController.upsertArticleById)
  .delete(articleController.deleteArticleById);

module.exports = router;
