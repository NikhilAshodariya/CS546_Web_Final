const express = require("express");
const router = express.Router();
const requireCookie = require("./user");
//const bcrypt = require("bcrypt");
//const usersdata = require("./data")
router.get("/", async (req, res) => {
    if (req.cookies.AuthCookie ) {
        res.render("menu/uploadfull", { css: "form.css" });
    }
    else {
        res.redirect("/userlogin");
    }
});

router.get("/image", async (req, res) => {
    if (req.cookies.AuthCookie) {
        res.render("menu/uploadimage", { css: "form.css" });
    }
    else{
        res.redirect("/userlogin");
    }
});


module.exports = router;