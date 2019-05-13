const Category = require("../models/category");

function getAllCategory(req, res) {
  Category.find((err, categories) => {
    if (err) throw err;

    res.send(categories);
  });
}

function findCategoryById(req, res) {
  Category.findById(req.params.id, (err, category) => {
    if (err) throw err;

    res.send(category);
  });
}

function upsertCategoryById(req, res) {
  if (req.body.id) {
    Category.findByIdAndUpdate(
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
      (err, category) => {
        if (err) throw err;

        res.send("success");
      }
    );
  } else {
    var category = new Category({
      title: req.body.title,
      parentId: req.body.parentId
    });

    Category.save(err => {
      if (err) throw err;

      res.send("success");
    });
  }
}

function deleteCategoryById(req, res) {
  Category.findByIdAndRemove(req.body.id, err => {
    if (err) throw err;

    res.send("success");
  });
}

module.exports = {
  getAllCategory,
  findCategoryById,
  upsertCategoryById,
  deleteCategoryById
};
