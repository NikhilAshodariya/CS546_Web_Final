const express = require("express");
const router = express.Router();
const users = require("../data/user");
const auth = require("../middleware/auth")


router.get("/", auth, async (req, res, next) => {
  console.log("why1")
  if (req.cookies.name === 'AuthCookie') {
    let userData = req.session.user
    console.log("why")
    if (userData) {
      console.log(req.session.user._id)
      user = await users.getUserById(req.session.user._id)
      console.log(user)
      res.render("users/user", { user: user, title: "Hi " + userData.name, auth: true })
    }
    else {
      res.render("users/login", { title: "Login" });
    }
  } 
  else {
      res.render("users/login", { title: "Login" });
      console.log("No cookie. Redirecting from /users to /login.")
  }
});

module.exports = router;