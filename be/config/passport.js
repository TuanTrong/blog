const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/user");

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne(
        {
          username: jwt_payload.username
        },
        (err, user) => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        }
      );
    } catch (err) {
      done(err);
    }
  })
);
