const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function login(req, res, next) {
  User.findOne(
    {
      username: req.body.username
    },
    (err, user) => {
      if (err || !user) return register(req, res, next);

      const isPasswordValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!isPasswordValid)
        return res.status(400).json({ message: "Login failed." });

      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET
      );

      return res.send(token);
    }
  );
}

function register(req, res, next) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user.save((err, user) => {
    if (err) {
      return next(err);
    }

    res.status(200).send({ message: "user created" });
  });
}

module.exports = {
  register,
  login
};
