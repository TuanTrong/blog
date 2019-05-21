const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const BCRYPT_SALT_ROUNDS = 12;

const userSchema = new Schema({
  username: String,
  password: String
});

userSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, BCRYPT_SALT_ROUNDS);

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
