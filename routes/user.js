const express = require("express");
const router = express.Router();
const users = require("../data/user");
const auth = require("../middleware/auth")


router.get("/", auth, async (req, res, next) => {
  if (req.cookies.name === 'AuthCookie') {
    let userData = req.session.user
    if (userData) {
      user = await users.getUserById(req.session.user._id)
      res.render("users/user", { user: user, title: "Hi " + userData.name, auth: true })
    }
    else {
      res.render("users/login", { title: "Login" });
    }
  } 
  else {
      res.render("users/login", { title: "Login" });
  }
});

module.exports = router;