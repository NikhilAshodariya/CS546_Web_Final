const MongoDB = require("mongodb");
const {
  orderCollection
} = require('../config/mongoCollections');
const menuData = require("./menu.js");

async function getAllOrderedMenus(orderId) {
  if (!orderId || typeof(orderId) != 'string') {
    // i.e. orderId is undefined
    return false;
  } else {
    console.log(`in getAllOrderedMenus order id = ${orderId}`);
    const orderCol = await orderCollection();
    var order_ = await getById(orderId);

    var allMenuItems = order_["menuItems"];
    console.log(`allMenuItems = ${allMenuItems} and it's length = ${allMenuItems.length}`);

    var toReturn = [];
    for (var i = 0; i < allMenuItems.length; i++) {
      toReturn.push(await menuData.getById(allMenuItems[i].toString()));
    }
    console.log(`to Return = ${toReturn}`);
    return toReturn;
  }
}

async function getById(id) {
  if (!id || typeof(id) != "string") {
    console.log("in order getById invalid Id passed");
    return false;
  } else {
    const orderCol = await orderCollection();
    var res;

    res = await orderCol.findOne({
      _id: MongoDB.ObjectID(id)
    });

    if (res === null) {
      console.log("in getById no order with that ID");
      return false;
    }
    return res;
  }
}

async function create(userEmail, productOrderedId) {
  // console.log(`orderCollection is ${orderCollection}`);
  var new_Menu_Item = await menuData.getById(productOrderedId);
  console.log(`in create new_Menu_Item = ${new_Menu_Item}`);
  if (!userEmail || typeof(userEmail) != 'string') {
    console.log(`in create if`);
    return false;
  }

  let newObj = {
    orderDateTime: new Date(),
    userId: userEmail,
    menuItems: [new_Menu_Item["_id"]],
    total: new_Menu_Item["price"],
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

async function update_Item_In_Order(orderId, productOrderedId) {
  if (!orderId || !productOrderedId) {
    return false;
  }

  var OriginalOrder = await getById(orderId);
  var new_Menu_Item = await menuData.getById(productOrderedId);

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
  console.log(`new_Menu_Item = ${new_Menu_Item}`);
  console.log(`OriginalOrder = ${OriginalOrder}`);
  console.log(`updatedInfo = ${updatedInfo} and modifiedCount = ${updatedInfo.modifiedCount}`);
  if (updatedInfo.modifiedCount === 0) {
    console.log("in update modifiedCount is zero");
    return false;
  } else {
    return await getById(orderId);
  }

}

async function delete_Menu_From_Order(orderId, menuId) {
  if (!orderId || !menuId) {
    return false;
  } else {
    var OriginalOrder = await getById(orderId);
    var menuItems = OriginalOrder["menuItems"];
    var toDeleteItem = await menuData.getById(menuId);
    var flag = 0;

    for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i].toString().trim() == menuId.toString().trim()) {
        delete menuItems[i];
        menuItems = menuItems.filter((val) => {
          return val != undefined
        });

        var temp = Number(OriginalOrder["total"]) - Number(toDeleteItem["price"])
        var newValues = {
          "$set": {
            "menuItems": menuItems,
            "total": temp
          }
        };

        var orderCol = await orderCollection();
        const updatedInfo = await orderCol.updateOne({
          _id: MongoDB.ObjectID(orderId.toString())
        }, newValues);

        if (updatedInfo.modifiedCount === 0) {
          flag = 0;
          break;
        } else {
          flag = 1;
          break;
        }
      }
    }
    if (flag === 1) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = {
  getById,
  create,
  update_Item_In_Order,
  getAllOrderedMenus,
  delete_Menu_From_Order
}
