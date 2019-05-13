const Article = require("../models/article");

function getAllArticle(req, res) {
  Article.find((err, articles) => {
    if (err) throw err;

    res.send(articles);
  });
}

function findArticleById(req, res) {
  Article.findById(req.params.id, (err, article) => {
    if (err) throw err;

    res.send(article);
  });
}

function upsertArticleById(req, res) {
  if (req.body.id) {
    Article.findByIdAndUpdate(
      req.body.id,
      {
        title: req.body.title,
        image: req.body.image,
        shortContent: req.body.shortContent,
        detailContent: req.body.detailContent,
        tags: req.body.tags,
        publishStatus: req.body.publishStatus,
        visibleStatus: req.body.visibleStatus,

        categoryId: req.body.categoryId
      },
      (err, article) => {
        if (err) throw err;

        res.send("success");
      }
    );
  } else {
    var article = new Article({
      title: req.body.title,
      image: req.body.image,
      shortContent: req.body.shortContent,
      detailContent: req.body.detailContent,
      tags: [],
      publishStatus: req.body.publishStatus,
      visibleStatus: req.body.visibleStatus,
      viewCount: 0,

      categoryId: req.body.categoryId,
      createDate: new Date()
    });

    article.save(err => {
      if (err) throw err;

      res.send("success");
    });
  }
}

function deleteArticleById(req, res) {
  Article.findByIdAndRemove(req.body.id, err => {
    if (err) throw err;

    res.send("success");
  });
}

module.exports = {
  getAllArticle,
  findArticleById,
  upsertArticleById,
  deleteArticleById
};
