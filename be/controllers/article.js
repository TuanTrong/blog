const redis = require("../config/redis");
const Article = require("../models/article");
const ObjectId = require("mongodb").ObjectID;

const REDIS_ARTICLES_KEY = "getAllArticle";

function getAllArticle(req, res, next) {
  redis.get(REDIS_ARTICLES_KEY, (err, articles) => {
    if (articles) {
      res.send(JSON.parse(articles));
    } else {
      Article.find()
        .sort({ createDate: -1 })
        .then(articles => {
          redis.set(REDIS_ARTICLES_KEY, JSON.stringify(articles));

          res.send(articles);
        })
        .catch(err => next(err));
    }
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

    categoryId: req.body.categoryId
  });

  article.save(err => {
    if (err) {
      return next(err);
    }

    redis.del(REDIS_ARTICLES_KEY);
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
      if (err) {
        return next(err);
      }

      res.send("updated");
    }
  );
}

function deleteArticleById(req, res) {
  Article.findOneAndDelete({ _id: ObjectId(req.params.id) }, err => {
    if (err) {
      return next(err);
    }

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
