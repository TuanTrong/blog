const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const BCRYPT_SALT_ROUNDS = 12;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is mandatory"]
  },
  password: {
    type: String,
    required: [true, "Password is mandatory"]
  }
});

userSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, BCRYPT_SALT_ROUNDS);

  next();
});

module.exports = mongoose.model("User", userSchema);
