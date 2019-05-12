const { checkObjectId } = require('../utils');
const bcrypt = require('bcrypt');

const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.usersCollection;
const orders = mongoCollections.menuCollection;


let exportedMethods = {
  async getAllUsers() {
    const userCollection = await users();
    const allUsers = await userCollection.find().toArray();
    const orderCollection = await orders();

    for (let user of allUsers) {
      const userOrders = await orderCollection.find({ userId: user._id }, { projection: { _id: 1, orderDateTime: 1, total: 1 } }).toArray();
      user.orders = userOrders;
    }
    return allUsers;
  },

  // const animalsCollection = await animals();
  //   const allAnimals = await animalsCollection.find().toArray();
  //   const postCollection = await posts();
  
  //   for (let animal of allAnimals) {
  //     const animalPosts = await postCollection.find({ author: animal._id }, { projection: { _id: 1, title: 1 } }).toArray();
  //     animal.posts = animalPosts;
  //   }
  //   return allAnimals;

  async getUserById(id) {
    const checkedId = checkObjectId(id);
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: checkedId });
    if (!user) throw 'User was not found!';
    return user;
  },

  async checkForUserByEmail(email) {
    const userCollection = await users();
    const user = await userCollection.findOne({ email: email });
    if (!user) return false;
    return true;
  },
  
  async addUser(email, name, hashedPassword) {
    // const userCollection = await users();
    return users().then(userCollection => {
      let newuser = {
        email: email,
        name: name,
        hashedPassword: hashedPassword,
      };

      console.log(newuser)

      return userCollection
        .insertOne(newuser)
        .then(newInsertInformation => {
          return newInsertInformation.insertedId;
        })
        .then(newId => {
          return this.getUserById(newId);
        });
    });
  },

  async removeUser(id) {
    const checkedId = checkObjectId(id);
    const deleteduser = await this.getUserById(checkedId);
    const userCollection = await users();
    
    const deletionInfo = await userCollection.removeOne({ _id: checkedId });
    if (deletionInfo.deletedCount === 0) {
      throw `Could not delete user.`;
    }

    const orderCollection = await order();
    await orderCollection.deleteMany({ user: checkedId });

    return {
      deleted : true,
      data : deleteduser
    };
  },

  async checkUsername(username) {
    const allUsers = await module.exports.getAllUsers();
    for (let user of allUsers) {
      if (user.email === username) { 
        return true 
      }
    }
    return false
  },

  async matchPassword(username, password) {
    const allUsers = await module.exports.getAllUsers();
    for (let user of allUsers) {
      if (user.email === username) {
        if (!bcrypt.compareSync(password, user.hashedPassword)) {
          return { status: false, message: "The provided password is incorrect." }
        } 
        else {
          return { status: true, user: user }
        }
      }
    }
    return { status: false, message: "No user found." }
  }
};

module.exports = exportedMethods;