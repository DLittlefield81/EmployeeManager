const db = require("./connection.js");
const { prompt } = require("inquirer");
const consoleTable = require("console.table");



function viewAllEmployees() {
    console.log("Displaying Results...\n");
    const rolesArr = []
    db.query(`SELECT
employees.first_name,
        employees.last_name,
        departments.dept_name
FROM employees
JOIN dept_emp
  ON employees.emp_no = dept_emp.emp_no
JOIN departments
  ON departments.dept_no = dept_emp.dept_no ;`, function (err, results) {
        console.table(results);
    })
};
function createEmployee() {
    console.log("createEmployee");
}



// SELECT
// employees.first_name,
//     employees.last_name,
//     departments.dept_name
// FROM employees
// JOIN dept_emp
//   ON employees.emp_no = dept_emp.emp_no
// JOIN departments
//   ON departments.dept_no = dept_emp.dept_no;


// SELECT
// student.first_name,
//     student.last_name,
//     course.name
// FROM student
// JOIN student_course
//   ON student.id = student_course.student_id
// JOIN course
//   ON course.id = student_course.course_id;


module.exports = { viewAllEmployees, createEmployee };