
const db = require("./scripts/connection.js");
const { prompt } = require("inquirer");
const consoleTable = require("console.table");
const { viewAllEmployees, createEmployee } = require('./scripts/employees.js');
const { viewAllRoles, createRole, updateEmployeeRole } = require('./scripts/roles.js');
const { viewAllDepartments, createDepartment } = require('./scripts/departments.js');




init();

// initial function at NPM start
function init() {
    console.log("\n==========================\nEmployee Management System\n==========================\n")
    
    runPrompts();
}

function runPrompts() {
    prompt([
        {
            // Load these prompts on NPM start
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },

                {
                    name: "Add a Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add a Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add an Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }

    ]).then(res => {
        let choice = res.choice;
        // Call the functions from what the user selects
        switch (choice) {
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                break;
            case "ADD_EMPLOYEE":
                createEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            case "VIEW_DEPARTMENTS":
                viewAllDepartments();
                break;
            case "ADD_DEPARTMENT":
                createDepartment();
                break;
            case "VIEW_ROLES":
                viewAllRoles();
                break;
            case "ADD_ROLE":
                createRole();
                break;

            default:
                quit();
        }
    }
    )
}


// Quit the application
function quit() {
    process.exit();
}