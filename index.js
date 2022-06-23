
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

//CREATE EMPLOYEE
function createEmployee() {
    let roleArr = [];
    let roleQuery = "SELECT role.title FROM role;";
    db.query(roleQuery, function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            roleArr.push(res[i].title)
        }
    })
        let mgrArr = [];
        let mgrQuery = "SELECT * FROM employee WHERE manager_id IS NOT NULL;";
    db.query(mgrQuery, function (err, res) {
        if (err) throw err;
        for (i = 0; i < res.length; i++) {
            mgrArr.push(res[i].first_name + " " + res[i].last_name)
        }
    })
            prompt([
                {
                    type: 'input',
                    message: 'What is your employees first name?',
                    name: "firstname"
                },
                {
                    type: 'input',
                    message: 'What is your employees last name?',
                    name: "lastname"
                },
                {
                    type: "list",
                    message: "Choose your employees role",
                    name: "role",
                    choices: roleArr
                },
                {
                    type: "list",
                    message: "Choose your employees role",
                    name: "manager",
                    choices: mgrArr
                },
            ]).then(function (response) {
                console.log("\nBuilding New Employee...\n");
                let addEmployeeRole = response.role;
                let addManager = response.manager;
                let addEmployeeRoleId = roleArr.indexOf(addEmployeeRole);
                let addManagerId = mgrArr.indexOf(addManager);
                addEmployeeRoleId++;
                addManagerId++;
                db.query("INSERT INTO employee SET ?",
                    {
                        first_name: response.firstname,
                        last_name: response.lastname,
                        role_id: addEmployeeRoleId,
                        manager_id: addManagerId
                    },
                    function (err, res) {
                        if (err) throw err;
                        console.log("Employee Created Succesfully\n");
                        mainMenu();
                    });
            });
        
    };

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
    let query = "UPDATE employee SET role_id = ? WHERE id = ?";
    let empID;

    db.query("SELECT * FROM employee", (err, res) => {
        if (err) console.log(err);
        // console.log(res);
        prompt([
            {
                type: "list",
                name: "employee_id",
                message: "Which employee's role do you want to update?",
                choices: res.map((employee) => {
                    return {
                        name: employee.first_name + " " + employee.last_name,
                        value: employee.id,
                    };
                }),
            },
        ]).then((res) => {
            empID = res.employee_id;
            db.query("SELECT * FROM role", (err, res) => {
                if (err) console.log(err);
                // console.log(res);
                prompt([
                    {
                        type: "list",
                        name: "role_id",
                        message: "Which role do you want to assign to the employee?",
                        choices: res.map((role) => {
                            return {
                                name: role.title,
                                value: role.id,
                            };
                        }),
                    },
                ])
                    .then((res) => {
                        db.query(query, [res.role_id, empID], (err, res) => {
                            if (err) console.log(err);
                            console.log("Employee role has been updated\n");
                            mainMenu();
                        });
                    });
            });
        });
    })
};


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