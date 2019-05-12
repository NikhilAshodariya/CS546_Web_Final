const express = require("express");
const router = express.Router();
const users = require("../data/user");
const auth = require("../middleware/auth")
var xss = require("xss");


router.get("/", async (req, res, next) => {
  if (req.cookies.name === 'AuthCookie') {
    // const thisUser = await users.getUserById(req.session.user._id)
    res.redirect("/user")
  } 
  else {
    res.render("users/login", { title: "Log In" });
  }
});


router.post("/", async (req, res, next) => {
  let email = xss(req.body.email);
  let password = xss(req.body.password);
  let emailresult, passwordresult

  if (email && password) {
    emailresult = await users.checkUsername(email);
    passwordresult = await users.matchPassword(email, password)

    if (emailresult && passwordresult.status) {
        let { _id, email } = passwordresult.user
        res.cookie('name', 'AuthCookie')
        let user = await users.getUserById(_id)
        
        req.session.user = user
        console.log(req.session.user)
        res.redirect("/user")
    }
    else {
      res.status(401).render("users/login", { title: "Login", message: "The username or password provided is incorrect." })
    }
  }
  else {
    res.status(401).render("users/login", { title: "Login", message: "No username or password provided." })
  }
});


module.exports = router;
