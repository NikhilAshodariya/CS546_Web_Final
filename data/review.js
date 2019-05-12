const {
  usersCollection,
  menuCollection,
  orderCollection,
  reviewCollection
} = require("../config/mongoCollections");
const users = require("./user");
const review = reviewCollection;
const users_ = usersCollection;
const { ObjectId } = require("mongodb");

async function getAllReview() {
  const reviewCollections = await review();
  let reviewList = await reviewCollections.find({}).toArray();
  return reviewList;
}

async function getReviewById(id) {
  if (!id) throw "You must provide an id to search for";
  if (typeof id !== "string") {
    throw ` incorrect input please enter a valid id check type maybeEE`;
  }
  if (arguments.length != 1) {
    throw "The input for getbyId function should be only one";
  }
  if(typeof id === "undefined") {
    throw "The input shouldn't be undefined";
}
  const reviewCollections = await review();
  let parsedReviewId = ObjectId.createFromHexString(id);
  let review_ = await reviewCollections.findOne({ _id: parsedReviewId });

  if (review_ === null) {
    throw `There is no such food with the id of ${id}`;
  }
  return review_;
}

// async function getReviewByEmail(user_email) {
//   if (!user_email) throw "You must provide an id to search for";
//   if (typeof user_email !== "string") {
//     throw ` incorrect input please enter a valid id check type maybeEE`;
//   }
//   if (arguments.length != 1) {
//     throw "The input for getbyId function should be only one";
//   }
//   if(typeof user_email === "undefined") {
//     throw "The input shouldn't be undefined";
// }
//   const reviewCollections = await review();
//   //let parsedReviewId = ObjectId.createFromHexString(email);
//   let review_ = await reviewCollections.findOne({email: user_email });

//   if (review_ === null) {
//     throw `There is no such user with the id of ${email}`;
//   }
//   return review_;
// }

async function addReview(userId, date, stars, comment) {
  if(arguments.length < 4) {
    throw "You should enter all four";
  }
  if (!stars) throw "You must provide stars";
        if (typeof comment !== 'string' || typeof userId !== 'string') {
          throw ` incorrect input please enter a valid input check type for comment  or id`;
            }
        
      //if(typeof date !== '')
  const reviewCollection = await review();
  //const usersCollection = await users_();

  const userThatPosted = await users.getUserById(String(userId));

  const newReview = {
    userId: userThatPosted._id,
    date: date,
    stars: stars,
    comment: comment
  };

  const newInsertInformation = await reviewCollection.insertOne(newReview);
  if (newInsertInformation.insertedCount === 0) {
    throw `Failed to create the review`;
  }
  const newId = newInsertInformation.insertedId;
  return await this.getReviewById(String(newId));
}

async function postReview(user_email, name, stars, comment) {
  if(arguments.length < 4) {
    throw "You should enter all four";
  }
  if (!stars) throw "You must provide stars";
        // if (typeof comment !== 'string' || typeof user_email !== 'string') {
        //   throw ` incorrect input please enter a valid input check type for comment  or id`;
        //     }
        
      //if(typeof date !== '')
  const reviewCollection = await review();
  //const usersCollection = await users_();

  //const userThatPosted = await users.getUserByEmail(user_email);
  //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa  "+ userThatPosted)

  const newReview = {
    user_emailId: user_email,
    name: name,
    stars: stars,
    comment: comment
  };

  const newInsertInformation = await reviewCollection.insertOne(newReview);
  if (newInsertInformation.insertedCount === 0) {
    throw `Failed to create the review`;
  }
  const newId = newInsertInformation.insertedId;
  return await getAllReview();
}



async function updateReview(id, updatedStars, updatedComment) {
  if (!id) throw "You must provide an id to search for";
  if (typeof id !== "string") {
    throw ` incorrect input please enter a valid id check type maybe`;
  }
  if(typeof updatedComment !== 'string'  && typeof updatedStars !== 'string'){
    throw 'check type of input comment or stars'
  }

  if (!updatedComment){
    throw 'enter comment'
  }

  if(!updatedStars){
    throw 'enter stars'
  }
  return this.getReviewById(String(id)).then(currentReview => {
    let reviewUpdateInfo = {
      stars: updatedStars,
      comment: updatedComment
    };

    let updateCommand = {
      $set: reviewUpdateInfo
    };
    console.log("hitprefinal");
    return review().then(reviewCollection => {
      const parsedId = ObjectId.createFromHexString(id);
      return reviewCollection
        .updateOne({ _id: parsedId }, updateCommand)
        .then(() => {
          return this.getReviewById(String(id));
        });
    });
  });
}

async function updateComment(id, updatedComment) {
  if (!id) throw "You must provide an id to search for";
  if (typeof id !== "string") {
    throw ` incorrect input please enter a valid id check type maybe`;
  }
  if(typeof updatedComment !== 'string'){
    throw 'check type of input comment or stars'
  }

  if (!updatedComment){
    throw 'enter comment'
  }

  return this.getReviewById(String(id)).then(currentReview => {
    let reviewUpdateInfo = {
      comment: updatedComment
    };

    let updateCommand = {
      $set: reviewUpdateInfo
    };
    console.log("hitprefinalyoloooooooo");
    return review().then(reviewCollection => {
      const parsedId = ObjectId.createFromHexString(id);
      console.log("am stuck here");
      return reviewCollection
        .updateOne({ _id: parsedId }, updateCommand)
        .then(() => {
          return this.getReviewById(String(id));
        });
    });
  });
}

async function updateStars(id, updatedStars) {
  if (!id) throw "You must provide an id to search for";
  if (typeof id !== "string") {
    throw ` incorrect input please enter a valid id check type maybe`;
  }
  if(typeof updatedStars !== 'string'){
    throw 'check type of input comment or stars'
  }
  if(!updatedStars){
    throw 'enter stars'
  }
  return this.getReviewById(String(id)).then(currentReview => {
    let reviewUpdateInfo = {
      stars: updatedStars
    };

    let updateCommand = {
      $set: reviewUpdateInfo
    };
    console.log("hitprefinal");
    return review().then(reviewCollection => {
      const parsedId = ObjectId.createFromHexString(id);
      return reviewCollection
        .updateOne({ _id: parsedId }, updateCommand)
        .then(() => {
          return this.getReviewById(String(id));
        });
    });
  });
}

async function deleteReview(id) {
  if (!id) throw "You must provide an id to search for";
  if (typeof id !== "string") {
    throw ` incorrect input please enter a valid id check type maybe`;
  }
  const reviewCollection = await review();
  const parsedId = ObjectId.createFromHexString(id);
  const obj = await this.getReviewById(String(parsedId));
  const deletionInfo = await reviewCollection.removeOne({ _id: parsedId });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete post with id of ${id}`;
  }
  return obj;
}

module.exports = {
  getAllReview,
  getReviewById,
  addReview,
  postReview,
  updateReview,
  updateComment,
  updateStars,
  deleteReview
};
