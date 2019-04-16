const express = require("express");
const router = express.Router();
const passport = require("../passport");
const User = require("../Models/User");

//This route is to get the basic user information
router.get("/user", (req, res, next) => {
  if (req.user) {
    return res.json({ user: req.user });
  } else {
    return res.json({ user: null });
  }
});

//This route is to post new user info
router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  User.findOne({ "local.username": username }, (err, userMatch) => {
    if (userMatch) {
      return res.json({ err: `Sorry the username ${username} is taken` });
    }
    const newUser = new User({
      "local.username": username,
      "local.password": password
    });
    newUser.save((err, savedUser) => {
      if (err) return res.json(err);
      return res.json(savedUser);
    });
  });
});

//This route is to check and authenticate user login
router.post("/login", passport.authenticate("local"), (req, res) => {
  const user = JSON.parse(JSON.stringify(req.user));
  const cleanUser = Object.assign({}, user);
  delete cleanUser.password;
  res.json({ user: cleanUser });
});

//Getting the session detail
router.get("/login", (req, res) => {
  const newUser = req.User.userName;
  res.json({ user: newUser });
});
//This route is for user logout
router.post("/logout", (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie("connect.sid"); //Cookie cleanup!!
    return res.json({ msg: "Logging you out" });
  } else {
    return res.json({ msg: "No user to logout" });
  }
});

module.exports = router;
