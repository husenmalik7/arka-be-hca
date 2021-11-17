// const mysql = require('./node_modules/mysql');
const mysql = require("mysql");

//connection configuration
var db = mysql.createConnection({
  // host: 'localhost',
  // user: 'root',
  // password: '',
  // database: 'w1bald1a'

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//connect to database
db.connect();

module.exports = db;
