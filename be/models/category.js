const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: String,
  parentId: String
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
