var mongoose = require("mongoose");

var Schema = mongoose.Schema;

const PublishStatus = {
  Draft: "Draft",
  Published: "Published",
  Deleted: "Deleted"
};

const VisibleStatus = {
  Normal: "Normal",
  Hot: "Hot",
  Docked: "Docked"
};

var articleSchema = new Schema({
  title: String,
  image: String,
  shortContent: String,
  detailContent: String,
  tagIds: [],
  publishStatus: String,
  visibleStatus: String,
  viewCount: Number,

  categoryId: Number
});

var Article = mongoose.model("Article", articleSchema);

var categoryScheme = new Schema({
  title: String,
  parentId: Number
});

var Category = mongoose.model("Category", categoryScheme);

module.exports = {
  Article,
  Category
};
