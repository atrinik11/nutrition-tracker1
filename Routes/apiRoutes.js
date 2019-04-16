const express = require("express");
const controllers = require("../controllers/controllers");
const router = express.Router();
const request = require("request");
const path = require("path");

//====================Authentication====================
const loggedIn = (req, res, next) => {
  if (req.isAuthenticate()) {
    next();
  } else {
    res.redirect("/login");
  }
};
router.get("/login", (req, res) => {
  res.redirect;
});

router.get("/profile/:user", controllers.getProfile);
router.post("/signup", controllers.createUser);
router.post("/signup/:user", controllers.updateUser);

module.exports = router;
