const router = require("express").Router();
const request = require("request");

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

router.post("/recaptchaVerify", async (req,res)=>{
  var clientBody = JSON.parse(JSON.stringify(req.body));
  var captchaThing = clientBody["g-recaptcha-response"] || clientBody["captcha"];
  console.log(`captcha thing = ${captchaThing}`);
  if (
    captchaThing === undefined ||
    captchaThing === "" ||
    captchaThing === null
  ) {
    console.log("in client side");
     res.status(200).json({ success: false, msg: "please select captcha" });
  } else {
    console.log("cap1");
    const secrectkey = "6LekVqMUAAAAAGQ_W4IzkOghxZATEQmhloxR30fH";
    const veriurl = `https://google.com/recaptcha/api/siteverify?secret=${secrectkey}&response=${
      captchaThing
    }&remoteapi=${req.connection.remoteAddress}`;
    console.log("cap2");
    request(veriurl, function(err, response, body) {
      body = JSON.parse(body);
      console.log("cap3");
      if (body.success !== undefined && !body.success) {
        console.log("first here");

        res.status(200).json({ success: false, msg: "Failed captcha verification" });
      } else {
        console.log("second here");
        var a = 10 + 2;
        console.log(a);
        //debugger;
        console.log(body.success);
        res.status(200).json({ "success": true, "msg": "Your review will be posted Thank You!!" });
      }
    });
  }
});
router.post("/", async (req, res) => {
  console.log("aswedfrthy");

  try {
    if(!req.body.name || !req.body.comment || !req.body.stars){
      throw e;
  }
    // let email = xss(req.body.user_emailId);
    // let emailresult = await user.checkUsername(email);
    // if (emailresult) {
      const newReview = await review.postReview(
        req.body.user_emailId,
        req.body.name,
        req.body.stars,
        req.body.comment
      );
      res.redirect("/writeReview");
    } 
    //else {
    //   const reviewList = await review.getAllReview();
    //   if (req.cookies.name === "AuthCookie") {
    //   res.status(401).render("writeReview", {
    //     cssName: "main",
    //     title: " Reviews",
    //     errorfound: "Click here create an account to add a review",
    //     ReviewList: reviewList,
    //     noError: true,
    //     auth:true
    //   });
    // }
    // else{
    //   res.status(401).render("writeReview", {
    //     cssName: "main",
    //     title: " Reviews",
    //     errorfound: "Click here create an account to add a review",
    //     ReviewList: reviewList,
    //     noError: true,
    //   });
    // }
    // }

    //res.status(200).json(newReview);
   catch (e) {
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
