const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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

const articleSchema = new Schema({
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

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
