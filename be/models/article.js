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
  tags: [],
  author: String,
  publishStatus: String,
  visibleStatus: String,
  viewCount: Number,

  categoryId: String,
  createDate: Date
});

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;
