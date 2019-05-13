const express = require('express');
const data = require("../data");
const router = express.Router();

const orderData = data.order;


// This route is used to add element to cart i.e. to order it
router.post("/create/:id", async (req, res) => {
  if (req.session.user == undefined) {
    res.writeHeader(200, {
      "Content-Type": "text/html",
    });
    res.write(`<html><body><script>alert('Login before adding to cart');window.location.href = "/menu"</script></body>`);
    res.end();

  }

  let userEmail = req.session.user;
  let productOrderedId = req.params.id;
  let orderId = req.session.orderId;

  if (orderId != undefined) {
    // That means that user has a already ordered something
    var check = await orderData.getById(orderId);
    if (check == false) {
      // you should create a order object here.
    } else {
      var updatedOrder = await orderData.update_Item_In_Order(orderId, productOrderedId);
      console.log(`updatedOrder = ${updatedOrder}`);
      if (updatedOrder == false) {
        // Something went wrong
      } else {
        res.redirect("/order/checkOut");
      }
    }
  } else {
    // that means that it is the first order of the user.
    console.log(`email = ${req.session.user["email"]}`); // this will give error if the user is not logged in.
    var check = await orderData.create(userEmail['email'], productOrderedId);
    console.log(check);
    if (check == false) {
      res.redirect('/menu');
    } else {
      req.session.orderId = check["_id"];
      res.redirect("/order/checkOut");
    }
  }
});

router.post("/delteOrder", async (req, res) => {
  req.session.orderId = undefined;
  res.status(200).json({
    "status": true
  });


});

// This route is used to finish purchase
router.get("/checkOut", async (req, res) => {
  console.log(`orderid = ${req.session.orderId}`);

  if (req.cookies.name === 'AuthCookie') {
    if (req.session.user) {
      res.render("order", {
        "cssName": "order",
        "auth": true,
        "title": "Cart"
      });
    } else {
      res.redirect('/login')
    }
  } else {
    res.redirect('/login')
  }
});

router.get("/payment", async (req, res) => {
  if (req.session.user != undefined) {

  }
});

router.post("/getAllOrders", async (req, res) => {
  if (req.session.orderId == undefined) {
    res.status(200).json({
      "status": false
    });
  } else {
    var check = await orderData.getAllOrderedMenus(req.session.orderId);
    if (check.length == 0) {
      res.status(200).json({});
    } else if (check == false) {
      res.status(500).json({
        "status": "Everything went wrong"
      });
    } else {
      res.status(200).json(check);
    }
  }
});

// This route will return all the elements of the cart so that the user can see it.
router.post("/getCart", async (req, res) => {
  let orderId = req.session.orderId;

  if (orderId == undefined) {
    // This means that user has not added any element to the cart yet.
    res.json({});
  } else {
    var check = await orderData.getAllOrders(orderId);
    res.json(check);
  }
});

router.delete("/deleteMenuItemFromOrder", async (req, res) => {
  let orderId = req.session.orderId;
  let menuId = req.body.menuId;

  if (orderId === undefined || menuId === undefined) {
    res.json({
      "status": false
    })
  } else {
    var check = await orderData.delete_Menu_From_Order(orderId, menuId);
    if (check == false) {
      res.json({
        "status": false
      });
    } else {
      res.json({
        "status": true
      });
    }
  }
});

module.exports = router;
