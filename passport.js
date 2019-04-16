const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("./Models/User");

passport.serializeUser((user, done) => {
  console.log("User in session", user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log("User in session2: ", user);
  done(null, user);
});

//Defining the local Strategy
passport.use(
  new localStrategy((userName, password, done) => {
    User.findOne({ userName: userName }, (err, response) => {
      if (!response) {
        return done(null, false, { message: "Unautherize Username" });
      } else {
        let valid = response.checkPassword(password, response.password);
        if (valid) {
          return done(null, {
            userName: response.userName,
            password: response.userName
          });
        } else if (valid !== true) {
          return done(null, false, { message: "Incorrect Password" });
        }
      }
      if (err) {
        done(err);
      }
    });
  })
);
module.exports = passport;
