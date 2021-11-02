const mysql = require("mysql");
require("dotenv").config();
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DBpass,
  database: "cabloc",
  multipleStatements: true,
});

connection.connect((e) => {
  if (e) {
    console.log("Error while connectiong to the mysql");
    console.log(e);
  } else {
    console.log("Connected to the MySQL client");
  }
});

module.exports = connection;
