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
  title: {
    type: String,
    required: [true, "Title is mandatory"]
  },
  image: {
    type: String,
    required: [true, "Image is mandatory"]
  },
  shortContent: {
    type: String,
    required: [true, "Short content is mandatory"]
  },
  detailContent: String,
  tags: [String],
  author: String,
  publishStatus: {
    type: String,
    enum: Object.values(PublishStatus)
  },
  visibleStatus: {
    type: String,
    enum: Object.values(VisibleStatus)
  },
  viewCount: {
    type: Number,
    default: 0
  },
  categoryId: String,
  createDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Article", articleSchema);
