const LocalStrategy = require("passport-local").Strategy;
const { comparepass } = require("./password_util");
const User = require("../models/User");
const passport = require("passport");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email }).select("+password");

          if (!user) {
            return done(null, false, { message: "User not found." });
          }

          const validate = await comparepass(password, user.password);

          if (!validate) {
            return done(null, false, { message: "Wrong password" });
          }

          return done(null, user, { message: "Logged in Successfully" });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) =>
    done(err, await User.findById(id))
  );
};
