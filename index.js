const { prompt } = require("inquirer");
//const db = require("./db/connection.js");
require("console.table");

const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    // MySQL Username
    user: "root",
    // MySQL Password
    password: "1nb0",
    database: "employees"
});

db.connect(function (err) {
    if (err) throw err;
});

init();

