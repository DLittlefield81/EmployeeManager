const db = require("./connection.js");
const { prompt } = require("inquirer");
const consoleTable = require("console.table");


function viewAllRoles() {
    console.log("Displaying Results...\n");
    const rolesArr=[]
    db.query('SELECT emp_no AS ID, title AS ROLES FROM titles GROUP BY title;', function (err, results) {
        console.table(results);
    })
};

function createRole() {
    console.log("createRole");
}
function updateEmployeeRole() {
    console.log("updateEmployeeRole");
}

module.exports = { viewAllRoles, createRole, updateEmployeeRole };