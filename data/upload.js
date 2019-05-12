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
  }//

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

async function addMenuImage(name, price, description, imagename, mimetype, imagepath) {
    const menuCollections = await menu();
    await CheckIsDefStr(name);
    await CheckIsProStr(name);
    await CheckIsDefNum(price);
    await CheckIsProNum(price);
    // await CheckIsDefStr(description);
    await CheckIsProStr(description);
    let newMenu = {
        name: name,
        price: price,
        description: description,
        imagename: imagename,
        mimetype: mimetype,
        imagepath: imagepath
    }
    console.log(newMenu);
    let insertMenu = await menuCollections.insertOne(newMenu);
    if(insertMenu.insertedCount === 0) {
        throw `Failed to create menu with image named ${name}`;
    }
    return newMenu;
}

async function addImage(name,imagename,mimetype, imagepath){
    const menuCollections = await menu();
    let newFood = {
        name: name,
        imagename: imagename,
        mimetype: mimetype,
        imagepath: imagepath
    }
    let insertfood = await menuCollections.insertOne(newFood);
    if (insertfood.insertedCount === 0) throw "Could not add post";
    return newFood;
}

module.exports = {
    getAll,
    getById,
    addMenuImage,
    addImage
}
