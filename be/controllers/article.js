const Article = require("../models/article");
const ObjectId = require("mongodb").ObjectID;

function getAllArticle(req, res, next) {
  Article.find((err, articles) => {
    if (err) next(err);

    res.send(articles);
  });
}

function findArticleById(req, res, next) {
  Article.findById(req.params.id, (err, article) => {
    if (err || !article) return next(err);

    res.send(article);
  });
}

function insertArticle(req, res, next) {
  const article = new Article({
    title: req.body.title,
    image: req.body.image,
    shortContent: req.body.shortContent,
    detailContent: req.body.detailContent,
    tags: req.body.tags,
    author: req.body.author,
    publishStatus: req.body.publishStatus,
    visibleStatus: req.body.visibleStatus,
    viewCount: 0,

    categoryId: req.body.categoryId,
    createDate: new Date()
  });

  article.save(err => {
    if (err) next(err);

    res.send("inserted");
  });
}

function updateArticleById(req, res, next) {
  Article.findOneAndUpdate(
    { _id: ObjectId(req.params.id) },
    {
      title: req.body.title,
      image: req.body.image,
      shortContent: req.body.shortContent,
      detailContent: req.body.detailContent,
      tags: req.body.tags,
      author: req.body.author,
      publishStatus: req.body.publishStatus,
      visibleStatus: req.body.visibleStatus,

      categoryId: req.body.categoryId
    },
    err => {
      if (err) next(err);

      res.send("updated");
    }
  );
}

function deleteArticleById(req, res) {
  Article.findOneAndDelete({ _id: ObjectId(req.params.id) }, err => {
    if (err) next(err);

    res.send("deleted");
  });
}

module.exports = {
  getAllArticle,
  findArticleById,
  insertArticle,
  updateArticleById,
  deleteArticleById
};
