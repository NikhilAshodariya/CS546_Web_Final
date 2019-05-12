// libraries
const express = require('express');
const bodyParser = require("body-parser");
const session = require("express-session");

const morgan = require('morgan'); // small library for our logger
const exphbs = require("express-handlebars");
const cookie = require('cookie-parser');
const session = require('express-session')

// Own libraries
const routes = require('./routes');


const app = express();

const static = express.static(__dirname + "/public");
app.use("/public", static);

// Middlewares Here
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(cookie());
app.use(morgan('dev')); // helper for logging our routes to the console

app.use(session({
  name: 'AuthCookie',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: true
}))

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Add API routes
// routes(app);
app.use(routes)

// Start the server
app.listen(3000, () => {
  console.log('Server Listening on localhost:3000');
});


// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// const static = express.static(__dirname + "/public");
// // const cookie = require('cookie-parser');
// const session = require('express-session')
// const routes = require("./routes");
// const exphbs = require("express-handlebars");

// app.use("/", static);
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // app.use(cookie());

// app.use(session({
//     name: 'AuthCookie',
//     secret: 'some secret string!',
//     resave: false,
//     saveUninitialized: true
// }))

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// routes(app);

// app.listen(3000, () => {
//     console.log("We've now got a server!");
//     console.log("Your routes will be running on http://localhost:3000");
// });
