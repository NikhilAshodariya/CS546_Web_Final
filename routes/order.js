const express = require('express');
const data = require("../data");
const router = express.Router();

const orderData = data.order;


// This route is used to add element to cart i.e. to order it
router.post("/create", async (req, res) => {
  console.log("in create route");
  let userEmail = req.body.userEmail;
  let productOrderedId = req.body.productOrderedId;
  let orderId = req.session.orderId;

  // request.session.AuthCookie = true;
  orderId = undefined;
  if (orderId != undefined) {
    // That means that user has a already ordered something
    var check = await orderData.getById(orderId);
    if (check == false) {
      // you should create a order object here.
    } else {
      var orderedProduct = await menuData.getById(productOrderedId); // this is the api of Jwiang
      var updatedOrder = await orderData.update_Item_In_Order(orderId, orderedProduct);
      if (updatedOrder == false) {
        // Something went wrong
      } else {
        // Everything is going best
        res.json({
          "status": true,
          "obj": updatedOrder
        });
      }
    }
  } else {
    // that means that it is the first order of the user.
    var check = await orderData.create(userEmail);
    console.log(check);
    if (check == false) {

    } else {
      req.session.orderId = check["_id"];
      res.json(check);
    }
  }


});

// This route is used to finish purchase
router.post("/checkOut", async (req, res) => {

});

// This route will return all the elements of the cart so that the user can see it.
router.post("/getCart", async (req, res) => {
  let orderId = req.session.orderId;

  if (orderId == undefined) {
    // This means that user has not added any element to the cart yet.
    res.json({

    });
  } else {
    var check = await orderData.getAllOrders(orderId);
    res.json(check);
  }
});

module.exports = router;
