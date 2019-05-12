const Category = require("../models/category");
const Article = require("../models/article");

module.exports = app => {
  app.get("/article/", (req, res) => {
    Article.find((err, articles) => {
      if (err) throw err;

      res.send(articles);
    });
  });

  app.get("/article/:id", (req, res) => {
    Article.findById(req.params.id, (err, article) => {
      if (err) throw err;

      res.send(article);
    });
  });

  app.post("/article/:id", (req, res) => {
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
  });

  app.delete("/article/:id", (req, res) => {
    Article.findByIdAndRemove(req.body.id, err => {
      if (err) throw err;

      res.send("success");
    });
  });
};
