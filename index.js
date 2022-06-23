
const db = require("./scripts/connection.js");
const { prompt } = require("inquirer");
const consoleTable = require("console.table");

init();

// INITIAL FUNCTION ON START
function init() {
    console.log("\n==========================\nEmployee Management System\n==========================\n")

    mainMenu();
}

function mainMenu() {
    prompt([
        {
            // LOAD MENU
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "View All Employees by Department",
                    value: "VIEW_EMPLOYEES_BY_DEPT"
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
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },

                {
                    name: "Add a Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add a Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }

    ]).then(res => {
        let choice = res.choice;
        // CALL MENU FUNCTION
        switch (choice) {
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                break;
            case "VIEW_EMPLOYEES_BY_DEPT":
                viewEmpbyDept();
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

//ALL EMPLOYEES
function viewAllEmployees() {
    console.log("Displaying Results...\n\n");
    db.query(
        `SELECT employee.id AS ID, employee.first_name AS "FIRST NAME", employee.last_name AS "LAST NAME", role.title AS ROLE, department.name AS DEPARTMENT, role.salary AS SALARY, CONCAT(manager.first_name, ' ', manager.last_name) AS MANAGER FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;`
        , function (err, results) {
            console.table(results);
            mainMenu();
            console.table(`\n`);
        });
};

// function viewAllEmployees() {
//     console.log("Displaying Results...\n");
//     const rolesArr = []
//     db.query(`
//     SELECT
//         id,
//         first_name,
//         last_name,
//     FROM employee;`
//     })
// };

// //ALL EMPLOYEES BY DEPT
// function viewEmpbyDept() {
//     console.log("Displaying Results...\n\n");
//     const rolesArr = []
//     db.query(`
//     SELECT
//         employees.first_name,
//         employees.last_name,
//         departments.dept_name 
//     FROM employees
//     GROUP BY departments.dept_name;`, function (err, results) {
//         console.table(results);
//         mainMenu();
//         console.table(`\n`);
//     })
// };

//CREATE EMPLOYEE
function createEmployee() {
    let query =
        "INSERT INTO employee (first_name,last_name,role,manager_id) VALUES (?, ?, ?, ?)";

    db.queryRole("SELECT * FROM role", (err, res) => {
        if (err) console.log(err);

        prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the name of the new employee?",
            },
            {
                type: "input",
                name: "last_name",
                messsage: "What is the last name of the new employee?",
            },
            {
                type: "list",
                name: "role",
                message: "What is the role of the new employee?",
                choices: res.map((role) => {
                    return {
                        name: role.title,
                        value: role.id,
                    }
                })
            },
                    {
                type: "list",
                name: "role",
                message: "What is the role of the new employee?",
                choices: res.map((manager_id) => {
                    return {
                        name: .title,
                        value: role.id,
                    };
                }),
            },
        ])
            .then((res) => {
                db.queryRole(
                    query,
                    [res.first_name, last_name, res.role, res.manager_id],
                    (err, res) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log(`Role has been created\n`);
                        mainMenu();
                    }
                );
            });
    });
}

//VIEW ALL ROLES
function viewAllRoles() {
    console.log("Displaying Results...\n");
    db.query(
        `SELECT role.id AS ID, role.title AS ROLES FROM role;`
        , function (err, results) {
            console.table(results);
            mainMenu();
            console.table(`\n`);
        });

};
//CREATE ROLE
function createRole() {
    let query =
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";

    db.query("SELECT * FROM department", (err, res) => {
        if (err) console.log(err);
        
       prompt([
                {
                    type: "input",
                    name: "title",
                    message: "What is the name of the new role?",
                },
                {
                    type: "input",
                    name: "salary",
                    messsage: "What is the salary of the role?",
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "What is the department of the role?",
                    choices: res.map((department) => {
                        return {
                            name: department.name,
                            value: department.id,
                        };
                    }),
                },
            ])
            .then((res) => {
                db.query(
                    query,
                    [res.title, res.salary, res.department_id],
                    (err, res) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        console.log(`Role has been created\n`);
                        mainMenu();
                    }
                );
            });
    });
}


//UPDATE EMPLOYEE ROLE
function updateEmployeeRole() {
    console.log("updateEmployeeRole");
    mainMenu();
    console.table(`\n`);
}

//VIEW ALL DEPT
function viewAllDepartments() {
    console.log("Displaying Results...\n");
    db.query(
        `SELECT department.id AS ID, department.name AS DEPARTMENTS FROM department;`
        , function (err, results) {
            console.table(results);
            mainMenu();
            console.table(`\n`);
        });

};

//CREATE DEPT
function createDepartment() {
    console.log("CREATE DEPARTMENT\n");
    let query = "INSERT INTO department (name) VALUES (?)";
    let params = [];
            prompt([
            {
                type: "input",
                name: "dept_name",
                message: "What is the name of the new department?",
            },
        ])
        .then((res) => {
            params.push(res.dept_name);
            db.query(query, params, (err, res) => {
                if (err) console.log(err);
                console.log(`Added ${params} Department.\n`);
                mainMenu();
            });
        });
}





// QUIT PROGRAM
function quit() {
    console.log("Terminating Application...\n");
    process.exit();
}