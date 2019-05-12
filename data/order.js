const MongoDB = require("mongodb");
const {
  orderCollection
} = require('../config/mongoCollections');
const menuData = require("./menu.js");

async function getAllOrderedMenus(orderId) {
  orderId = "5cd85836c608972cd4408be0";
  const orderCol = await orderCollection();
  var order_ = await getById(orderId);

  var allMenuItems = order_["menuItems"];

  var toReturn = [];
  for (var i = 0; i < allMenuItems.length; i++) {
    toReturn[i] = await  menuData.getById(allMenuItems[i]);
  }
  return toReturn;
}

async function getById(id) {
  if (!id) {
    console.log("in order getById invalid Id passed");
    return false;
  } else {
    const orderCol = await orderCollection();
    var res;

    res = await orderCol.findOne({
      _id: MongoDB.ObjectID(id)
    });
    // console.log(`res = ${res["userId"]}`);

    if (res === null) {
      console.log("in getById no order with that ID");
      return false;
    }
    return res;
  }
}

async function create(userEmail) {
  // console.log(`orderCollection is ${orderCollection}`);
  if (!userEmail) {
    return false;
  }

  let newObj = {
    orderDateTime: new Date(),
    userId: userEmail,
    menuItems: [],
    total: 0,
  }
  var orderCol = await orderCollection();
  const insertInfo = await orderCol.insertOne(newObj);
  if (insertInfo.insertedCount === 0) {
    console.log("in create Could not add new Animal");
    return false;
  }
  // const newId = insertInfo.insertedId;
  const {
    ops
  } = insertInfo;
  return ops[0];
}

async function update_Item_In_Order(orderId, new_Menu_Item) {
  var OriginalOrder = await getById(orderId);

  var prodPrice = new_Menu_Item["price"];
  var prodId = new_Menu_Item["_id"];
  var temp = Number(OriginalOrder["total"]) + prodPrice;
  // db.clubs.update({clubname: ”Manhattan"}, {$push: {visitors: {women: 0}}})
  var newValues = {
    "$set": {
      "total": temp
    },
    "$push": {
      "menuItems": prodId
    }
  };

  var orderCol = await orderCollection();
  const updatedInfo = await orderCol.updateOne({
    _id: MongoDB.ObjectID(orderId)
  }, newValues);

  if (updatedInfo.modifiedCount === 0) {
    console.log("in update modifiedCount is zero");
    return false;
  } else {
    return await getById(orderId);
  }

}

module.exports = {
  getById,
  create,
  update_Item_In_Order,
  getAllOrderedMenus
}
