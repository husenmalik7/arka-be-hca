// require('dotenv').config()
require("dotenv/config");
const express = require("express");
const bodyParser = require("body-parser");

// var mysql = require('mysql');

const router = require("./src/Routes/index");

const cors = require("cors");

const app = express();

app.use(cors());

//set port
app.listen(process.env.SERVER_PORT, function () {
  console.log(`localhost:${process.env.SERVER_PORT} now running`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); //what is the different if extended value false vs true?

app.use("/", router);

module.exports = app;

//--------------
//before changes
//--------------
//see on git, and you can find some comment in there too
