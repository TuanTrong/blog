const Article = require("../models/article");
var ObjectId = require("mongodb").ObjectID;

function getAllArticle(req, res) {
  Article.find((err, articles) => {
    if (err) throw err;

    res.send(articles);
  });
}

function findArticleById(req, res) {
  Article.findById(req.params.id, (err, article) => {
    if (err || !article) return res.status(404).send(err);

    res.send(article);
  });
}

function upsertArticleById(req, res) {
  if (req.params.id) {
    Article.findByIdAndUpdate(
      req.params.id,
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
      author: req.body.author,
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
  Article.findOneAndDelete({ _id: ObjectId(req.params.id) }).then(_ => {
    res.send("deleted");
  });
}

module.exports = {
  getAllArticle,
  findArticleById,
  upsertArticleById,
  deleteArticleById
};
