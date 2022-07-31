const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { compare } = require("../config/password_util");
const User = require("../models/User");
const passport = require("passport");

module.exports = function () {
  setupLocalStrategy();
  // setupJwtStrategy();

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) =>
    done(err, await User.findById(id))
  );
};

/**
 * Setup local strategy
 */
function setupLocalStrategy() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          if (!compare(password, user.password)) {
            return done(null, false, { message: "Incorrect password." });
          }
          return done(null, user);
        }).select("+password");
      }
    )
  );
}
