const router = require("express").Router();

const {
  user,
  review
} = require("../data");
const auth = require("../middleware/auth");
var xss = require("xss");

router.get("/", async (req, res) => {
  //console.log(req.session.username);
  try {
    const reviewList = await review.getAllReview();
    //res.render("review",{title:"Reviews" , ReviewList:reviewList, noError:true})

    if (req.session.user != undefined) {
      // const thisUser = await users.getUserById(req.session.user._id)
      res.render("writeReview", {
        cssName: "main",
        title: "Reviews",
        ReviewList: reviewList,
        noError: true,
        auth: true
      });
    } else {
      res.render("writeReview", {
        cssName: "main",
        title: "Reviews",
        ReviewList: reviewList,
        noError: true
      });
    }
    //}
  } catch (e) {
    console.log("Error is found ", e);
    res
      .sendStatus(500)
      .json({
        error: e.toString() || "Server Error",
        route: req.originalUrl
      });
  }
});

router.post("/", async (req, res) => {
  console.log("aswedfrthy");

  try {
    if(!req.body.user_emailId || !req.body.name || !req.body.comment || !req.body.stars){
      throw e;
  }
    let email = xss(req.body.user_emailId);
    let emailresult = await user.checkUsername(email);
    if (emailresult) {
      const newReview = await review.postReview(
        req.body.user_emailId,
        req.body.name,
        req.body.stars,
        req.body.comment
      );
      res.redirect("/writeReview");
    } else {
      const reviewList = await review.getAllReview();
      if (req.cookies.name === "AuthCookie") {
      res.status(401).render("writeReview", {
        cssName: "main",
        title: " Reviews",
        errorfound: "Click here create an account to add a review",
        ReviewList: reviewList,
        noError: true,
        auth:true
      });
    }
    else{
      res.status(401).render("writeReview", {
        cssName: "main",
        title: " Reviews",
        errorfound: "Click here create an account to add a review",
        ReviewList: reviewList,
        noError: true,
      });
    }
    }

    //res.status(200).json(newReview);
  } catch (e) {
    console.log("am just caught here");
    const reviewList = await review.getAllReview();
    if (req.cookies.name === "AuthCookie") {
    res.status(401).render("writeReview", {
      cssName: "main",
      title: " Reviews",
      emptyerror: "Please fill all the fields",
      ReviewList: reviewList,
      noError: true,
      auth:true
    });
  }else{
    res.status(401).render("writeReview", {
      cssName: "main",
      title: " Reviews",
      errorfound: "Please fill all the fields",
      ReviewList: reviewList,
      noError: true
    });
  }
  }
});

module.exports = router;
