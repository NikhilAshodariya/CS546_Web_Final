const menu = require('./menu.js');
const user = require('./user.js');
const review = require("./review.js");
const order = require("./order.js");
const upload = require("./upload.js")

/*
  Export both data modules in one file.
    This doesn't change any functionality of your application, but it's good
    practice to group the data into one export, which allows for cleaner code.
*/
module.exports = {
  menu,
  user,
  review,
  order,
  upload
};
