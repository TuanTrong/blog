var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var categoryScheme = new Schema({
  value: String,
  nodes: [this]
});

var Category = mongoose.model("Category", categoryScheme);

module.exports = Category;
