var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var categoryScheme = new Schema({
  title: String,
  parentId: String
});

var Category = mongoose.model("Category", categoryScheme);

module.exports = Category;
