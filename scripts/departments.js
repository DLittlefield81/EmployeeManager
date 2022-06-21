const db = require("./connection.js");
const { prompt } = require("inquirer");
const consoleTable = require("console.table");

function viewAllDepartments(){
    console.log("Displaying Results...\n");
   
    db.query('SELECT dept_no AS ID, dept_name AS DEPARTMENTS FROM departments;', function (err, results) {
        console.table(results);
    });
}
function createDepartment() {
    console.log("createDepartment");
}


module.exports = { viewAllDepartments, createDepartment };