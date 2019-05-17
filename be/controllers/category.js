const Category = require("../models/category");
var ObjectId = require("mongodb").ObjectID;

function getAllCategory(req, res, next) {
  Category.find((err, categories) => {
    if (err) next(err);

    res.send(categories);
  });
}

function findCategoryById(req, res, next) {
  Category.findById(req.params.id, (err, category) => {
    if (err || !category) return next(err);

    res.send(category);
  });
}

function insertCategory(req, res, next) {
  var category = new Category({
    title: req.body.title,
    parentId: req.body.parentId
  });

  category.save(err => {
    if (err) next(err);

    res.send("inserted");
  });
}

function updateCategoryById(req, res) {
  Category.findOneAndUpdate(
    { _id: ObjectId(req.params.id) },
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
    err => {
      if (err) next(err);

      res.send("updated");
    }
  );
}

function deleteCategoryById(req, res, next) {
  Category.findOneAndRemove({ _id: ObjectId(req.params.id) }, err => {
    if (err) next(err);

    res.send("deleted");
  });
}

module.exports = {
  getAllCategory,
  findCategoryById,
  insertCategory,
  updateCategoryById,
  deleteCategoryById
};
