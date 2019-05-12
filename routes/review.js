const router = require("express").Router();

const { user, review } = require("../data");

// GET todos/
// router.get('/', async (req, res) => {
//   res.json({
//     "status": "yet to implement review slash"
//   });
// });

router.get("/", async (req, res) => {
  try {
    console.log("animalList111111gtftutdyt");
    const reviewList = await review.getAllReview();
    // const userList = await user.getAllUsers();
    // console.log("animalList111111");
    // let review_get = {};
    // let Review_User = [];
    // for (let i = 0; i < reviewList.length; i++) {
    //   for (let j = 0; j < userList.length; j++) {
    //     if (reviewList[i]["user_emailId"] == userList[j]["email"]) {
    //       console.log("hits here");
    //       // let userWhoReviewed = {
    //       //   _id: userList[j]._id,
    //       //   name: userList[j]["name"],
    //       //   email: userList[j]["email"]
    //       // };
    //       review_get = {
    //         _id: reviewList[i]._id,
    //         user_emailId: reviewList[i]["user_emailId"],
    //         stars: reviewList[i]["stars"],
    //         comment: reviewList[i]["comment"]
    //       };
    //       Review_User.push(review_get);
    //       console.log("getList");
    //     }
    //   }
    // }

    if (req.cookies.name === 'AuthCookie') {
      // const thisUser = await users.getUserById(req.session.user._id)
      res.render("review",{title:"Reviews" , ReviewList:reviewList, noError:true, auth: true})
    } 
    else {
      res.render("review",{title:"Reviews" , ReviewList:reviewList, noError:true})
    }
  }
    //res.status(200).json(reviewList);
  catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    await review.getReviewById(String(req.params.id));
  } catch (e) {
    res.status(404).json({ error: " nothing is found" });
  }

  try {
    const reviewList = await review.getReviewById(String(req.params.id));
    const userList = await user.getAllUsers();
    let review_get = {};
    let Review_User = [];
    for (let j = 0; j < userList.length; j++) {
      if (reviewList["userId"].equals(userList[j]._id)) {
        //console.log("hits here");
        let userWhoReviewed = {
          _id: userList[j]._id,
          name: userList[j]["name"],
          email: userList[j]["email"]
        };
        review_get = {
          _id: reviewList._id,
          userWhoReviewed: userWhoReviewed,
          date: reviewList["date"],
          stars: reviewList["stars"],
          comment: reviewList["comment"]
        };
        Review_User.push(review_get);
      }
    }
    res.status(200).json(Review_User);
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
  }
});

router.post("/", async (req, res) => {
  for (var key in req.body) {
    if (
      key != "userId" &&
      key != "date" &&
      key != "stars" &&
      key != "comment"
    ) {
      res.status(400).json("Kindly check your res.body");
    }
  }
  const blogReviewData = req.body;

  if (!blogReviewData) {
    res.status(400).json({ error: "You must provide data to add a review" });
    return;
  }

  if (!blogReviewData.userId) {
    res.status(400).json({ error: "You must provide data to add a review" });
    return;
  }
  if (!blogReviewData.date) {
    res.status(400).json({ error: "You must provide data to add a review" });
    return;
  }
  if (!blogReviewData.stars) {
    res.status(400).json({ error: "You must provide data to add a review" });
    return;
  }
  if (!blogReviewData.comment) {
    res.status(400).json({ error: "You must provide data to add a review" });
    return;
  }

  try {
    const newReview = await review.addReview(
      blogReviewData.userId,
      blogReviewData.date,
      blogReviewData.stars,
      blogReviewData.comment
    );
    const userList = await user.getAllUsers();
    let review_get = {};
    let Review_User = [];
    for (let j = 0; j < userList.length; j++) {
      if (newReview["userId"].equals(userList[j]._id)) {
        //console.log("hits here");
        let userWhoReviewed = {
          _id: userList[j]._id,
          name: userList[j]["name"],
          email: userList[j]["email"]
        };
        review_get = {
          _id: newReview._id,
          userWhoReviewed: userWhoReviewed,
          date: newReview["date"],
          stars: newReview["stars"],
          comment: newReview["comment"]
        };
        Review_User.push(review_get);
      }
    }
    res.status(200).json(Review_User);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log("hitsss1");
    await review.getReviewById(String(req.params.id));
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
  }
  try {
    console.log("hitsss2");
    const deletedobj = await review.deleteReview(String(req.params.id));
    const userList = await user.getAllUsers();
    let review_get = {};
    let Review_User = [];
    for (let j = 0; j < userList.length; j++) {
      if (deletedobj["userId"].equals(userList[j]._id)) {
        //console.log("hits here");
        let userWhoReviewed = {
          _id: userList[j]._id,
          name: userList[j]["name"],
          email: userList[j]["email"]
        };
        review_get = {
          _id: deletedobj._id,
          userWhoReviewed: userWhoReviewed,
          date: deletedobj["date"],
          stars: deletedobj["stars"],
          comment: deletedobj["comment"]
        };
        Review_User.push(review_get);
      }
    }
    res.status(200).json(Review_User);
    //res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.put("/:id", async (req, res) => {
  for (var key in req.body) {
    if (key != "newStars" && key != "newComment") {
      res.status(400).json("Kindly check your res.body");
    }
  }
  const userInfo_newStars = req.body.newStars;
  const userInfo_newComment = req.body.newComment;
  try {
    console.log("hit1");
    await review.getReviewById(String(req.params.id));
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
  }
  try {
    if (!userInfo_newComment && userInfo_newStars !== undefined) {
      console.log("hitss1");
      const updatedReview = await review.updateStars(
        String(req.params.id),
        userInfo_newStars
      );
      const userList = await user.getAllUsers();
      let review_get = {};
      let Review_User = [];
      for (let j = 0; j < userList.length; j++) {
        if (updatedReview["userId"].equals(userList[j]._id)) {
          //console.log("hits here");
          let userWhoReviewed = {
            _id: userList[j]._id,
            name: userList[j]["name"],
            email: userList[j]["email"]
          };
          review_get = {
            _id: updatedReview._id,
            userId: userWhoReviewed,
            date: updatedReview["date"],
            stars: updatedReview["stars"],
            comment: updatedReview["comment"]
          };
          Review_User.push(review_get);
        }
      }
      res.status(200).json(Review_User);
      //res.json(updatedPost);
    } else if (!userInfo_newStars && userInfo_newComment !== undefined) {
      console.log("hitss2");
      const updatedReview = await review.updateComment(
        String(req.params.id),
        userInfo_newComment
      );

      console.log("may be hhere");
      const userList = await user.getAllUsers();
      let review_get = {};
      let Review_User = [];
      for (let j = 0; j < userList.length; j++) {
        if (updatedReview["userId"].equals(userList[j]._id)) {
          //console.log("hits here");
          let userWhoReviewed = {
            _id: userList[j]._id,
            name: userList[j]["name"],
            email: userList[j]["email"]
          };
          review_get = {
            _id: updatedReview._id,
            userId: userWhoReviewed,
            date: updatedReview["date"],
            stars: updatedReview["stars"],
            comment: updatedReview["comment"]
          };
          Review_User.push(review_get);
        }
      }
      res.status(200).json(Review_User);
      //res.json(updatedPost);
    } else {
      console.log("hitss3");
      const updatedReview = await review.updateReview(
        String(req.params.id),
        userInfo_newStars,
        userInfo_newComment
      );
      const userList = await user.getAllUsers();
      let review_get = {};
      let Review_User = [];
      for (let j = 0; j < userList.length; j++) {
        if (updatedReview["userId"].equals(userList[j]._id)) {
          //console.log("hits here");
          let userWhoReviewed = {
            _id: userList[j]._id,
            name: userList[j]["name"],
            email: userList[j]["email"]
          };
          review_get = {
            _id: updatedReview._id,
            userId: userWhoReviewed,
            date: updatedReview["date"],
            stars: updatedReview["stars"],
            comment: updatedReview["comment"]
          };
          Review_User.push(review_get);
        }
      }
      res.status(200).json(Review_User);
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
