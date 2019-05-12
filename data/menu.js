const {
  usersCollection,
  menuCollection,
  orderCollection,
  reviewCollection
} = require('../config/mongoCollections.js');
const menu = menuCollection;
const { ObjectId } = require("mongodb");
// const mongoCollections = require("../config/mongoCollections");
// const menu = mongoCollections.menuCollection;

//Check str
async function CheckIsProStr(str) {
  if(typeof str != "string") {
      throw `The input ${str} should be in a correct type which is a string`;
  }
}

async function CheckIsDefStr(str) {
  if(!str) {
      throw "The input should be existed";
  }
  
  if(typeof str === "undefined") {
      throw "The input shouldn't be undefined";
  }
  
}

async function CheckIsId(str) {
  if((str.length != 24) && (str.length != 32)) {
      throw "The id should be 24 or 32 hex characters";
  }

  signal = true;

  for(let i = 0; i < str.length; i ++ ) {
      if((str.charCodeAt(i)<48)||((str.charCodeAt(i)>57)&&(str.charCodeAt(i)<65))||((str.charCodeAt(i)>70)&&(str.charCodeAt(i)<97))||(str.charCodeAt(i)>102)) {
          signal = false;
      }
  }

  if(signal == false) {
      throw "The id is not correct as 24 hex characters";
  }
}//

//Check num
async function CheckIsDefNum(num) {
  if(!num) {
      throw "The number should be existed";
  }

  if(typeof num === "undefined") {
      throw "The input shouldn't be undefined";
  }
}

async function CheckIsProNum(num) {
  if(typeof num != "number") {
      throw `The input ${num} should be in a correct type which is a num`;
  }

  if(num <= 0) {
    throw "Please enter a positive number";
  }
}

function CheckIsObj(obj) {
  if(typeof obj != "object") {
      throw "The input should be in a correct type, and you should enter an object";
  }
}

// function CheckIsDefObj(obj) {
//   if(!obj) {
//       throw "The object should be existed";
//   }

//   if(typeof obj === "undefined") {
//       throw "The input should be defined";
//   }
// }//


async function getAll() {
  const menuCollections = await menu();
  let menuList = await menuCollections.find({}).toArray();
  return menuList;
}



async function getById(id) {//id is str not objectId
  if(arguments.length != 1) {
    throw "The input for getbyId function should be only one";
  }

  await CheckIsDefStr(id);
  await CheckIsProStr(id);
  await CheckIsId(id);

  const menuCollections = await menu();
  let parsedFoodId = ObjectId.createFromHexString(id);
  let food = await menuCollections.findOne({_id: parsedFoodId});

  if(food === null) {
    throw `There is no such food with the id of ${id}`;
  }
  return food;
}

async function getByName(foodname) {
  if(arguments.length != 1) {
    throw "The input for getbyName function should be only one";
  }

  await CheckIsDefStr(foodname);
  await CheckIsProStr(foodname);

  const menuCollections = await menu();
  let food = await menuCollections.findOne({name: foodname});

  if(food == null) {
    throw `There is no such food with the name of ${foodname}`;
  }
  return food;
}

async function create(name, price, description, imageinfo) {
  if(arguments.length < 2) {
    throw "You should enter at least name and price";
  }

  await CheckIsDefStr(name);
  await CheckIsProStr(name);
  await CheckIsDefNum(price);
  await CheckIsProNum(price);
  // await CheckIsDefStr(description);
  await CheckIsProStr(description);
  await CheckIsObj(imageinfo);

  let newFood = {
    name: "",
    price: 0,
    description: "",
    imageinfo: {}
  }

  newFood.name = name;
  newFood.price = price;
  newFood.description = description;
  newFood.imageinfo = imageinfo;

  const menuCollections = await menu();
  let Foodadded = await menuCollections.insertOne(newFood);
  if(Foodadded.insertedCount === 0) {
    throw `Failed to create the food named ${name}`;
  }
  return newFood;
}

async function updateNameByName(name, Newname) {
  if(arguments.length != 2) {
    throw `You should enter the new name of ${name}`;
  }
  
  await CheckIsDefStr(name);
  await CheckIsProStr(name);
  await CheckIsDefStr(Newname);
  await CheckIsProStr(Newname);

  const menuCollections = await menu();
  let updatenameOne = await this.getByName(name);
  if(updatenameOne === null) {
    throw "No such food name for updating";
  }

  // let parsedFoodId = ObjectId.createFromHexString(id);
  let updateId = updatenameOne[_id];
  let updateNameFood = await menuCollections.updateOne({_id: updateId}, {$set: {name: Newname}});

  if(updateNameFood.modifiedCount === 0) {
    throw `Failed to rename the food with the name of ${Newname}`;
  }

  return await this.getByName(Newname);
}

async function updatePriceByName(name, Newprice) {
  if(arguments.length != 2) {
    throw `You should enter the name and new price`;
  }
  
  await CheckIsDefStr(name);
  await CheckIsProStr(name);
  await CheckIsDefNum(Newprice);
  await CheckIsProNum(Newprice);

  const menuCollections = await menu();
  let updatePriceOne = await this.getByName(name);
  if(updatePriceOne === null) {
    throw "No such food name for updating";
  }

  // let parsedFoodId = ObjectId.createFromHexString(id);
  let updateId = updatePriceOne[_id];
  let updatePriceFood = await menuCollections.updateOne({_id: updateId}, {$set: {price: Newprice}});

  if(updatePriceFood.modifiedCount === 0) {
    throw `Failed to reset the price of the food with the name of ${name}`;
  }

  return await this.getByName(name);
}

async function updateDesByName(name, NewDes) {
  if(arguments.length != 2) {
    throw `You should enter the name and new description`;
  }
  
  await CheckIsDefStr(name);
  await CheckIsProStr(name);
  await CheckIsDefStr(NewDes);
  await CheckIsProStr(NewDes);

  const menuCollections = await menu();
  let updateDesOne = await this.getByName(name);
  if(updateDesOne === null) {
    throw "No such food name for updating";
  }

  // let parsedFoodId = ObjectId.createFromHexString(id);
  let updateId = updateDesOne[_id];
  let updateDesFood = await menuCollections.updateOne({_id: updateId}, {$set: {description: NewDes}});

  if(updateDesFood.modifiedCount === 0) {
    throw `Failed to reset the description of the food with the name of ${name}`;
  }

  return await this.getByName(name);
}

async function removeById(id) {
  if(arguments.length != 1) {
    throw `You should enter the id of ${id}`;
  }

  await CheckIsDefStr(id);
  await CheckIsProStr(id);
  await CheckIsId(id);

  const menuCollections = await menu();
  let parsedFoodId = ObjectId.createFromHexString(id);
  // let food = await menu.findOne({_id: parsedFoodId});
  let deleteFood = await this.getById(id);
  if(deleteFood === null) {
    throw `There is no such food with the id of ${id}`;
  }

  let removeFood = await menuCollections.removeOne({_id: parsedFoodId});

  if(removeFood.deletedCount === 0) {
    throw `Failed to remove food with id of ${id}`
  }
  return deleteFood;
}

async function removeByName(name) {
  if(arguments.length != 1) {
    throw `You should enter the name of ${name}`;
  }

  await CheckIsDefStr(name);
  await CheckIsProStr(name);

  const menuCollections = await menu();
  let deleteFoodName = await this.getByName(name);
  // let parsedFoodId = ObjectId.createFromHexString(id);
  // // let food = await menu.findOne({_id: parsedFoodId});
  // let deleteFood = await this.getById(id);
  if(deleteFoodName === null) {
    throw `There is no such food with the name of ${name}`;
  }

  let removeFoodId = deleteFoodName[_id];
  let removeFoodName = await menuCollections.removeOne({_id: removeFoodId});

  if(removeFoodName.deletedCount === 0) {
    throw `Failed to remove food with id of ${id}`
  }
  return deleteFoodName;
}

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  updateNameByName,
  updatePriceByName,
  updateDesByName,
  removeById,
  removeByName
};
