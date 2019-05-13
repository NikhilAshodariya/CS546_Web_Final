const express = require("express");
const router = express.Router();
const users = require("../data/user");
const auth = require("../middleware/auth")


router.get("/", (req, res, next) => {
    res.clearCookie('name');
    // req.session.user
    res.redirect("/");
    console.log("redirect");
    req.session.destroy();
  });


module.exports = router;
