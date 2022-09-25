const inquirer = require("inquirer");
const mysql = require('mysql2');
const { table } = require('table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'superlame',
      database: 'store_db'
    },
    console.log(`Connected to the store_db database.`)
);

class Directory {
    constructor(){
        this.answer = "";
    }

    // *********************** Init Function *********************** //
    async menuSelection(){

        const menuQuestion = await inquirer.prompt([
            {
                type: "list",
                name: "options",
                message: "What would you like to do?",
                choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "exit"]
            }
        ])

        switch(menuQuestion.options) {
            case "view all departments":
                this.getDepartments();
                break;    
            case "view all roles": 
                this.getRoles();
                break;
            case "view all employees": 
                this.getEmployees();
                break;
            case "add a department":
                this.addDepartment();
                break;
            case "add a role": 
                this.addRole();
                break;
            case "add an employee": 
                this.addEmployee();
                break;
            case "update an employee role": 
                this.updateEmpRole();
                break;
            case "exit": 
                break;
        }
    }
 
    // ************* function to display the title ************* //
    displayTitle() {
        const configTitle = {
            columns: [
              {
                width: 20,
                truncate: 100
              }
            ]
        };
        
        const title = [
            ['Employee Tracker']
        ];

        console.log(table(title, configTitle));
    }

    // ****************** view functions ****************** //
    async getDepartments() { 
        const sql = `SELECT * FROM department`;
        const labelArray = ["ID", "DEPARTMENT NAME"];
        const callback = (item) => {
            return [item.id, item.name]
        };

        this.getResults(sql, labelArray, callback)
    }

    async getRoles() { 
        // const sql = `SELECT * FROM role`;
        const sql = `SELECT role.id AS id, role.title AS title, role.salary AS salary, department.name AS department_id
        FROM role
        LEFT JOIN department ON role.department_id = department.id`
        const labelArray = ["ID", "TITLE", "SALARY", "DEPARTMENT"];
        const callback = (item) => {
            return [item.id, item.title, item.salary, item.department_id]
        };

        this.getResults(sql, labelArray, callback)
    }

    async getEmployees() { 
        // const sql = `SELECT * FROM employee`;
        const sql = `SELECT employee.id AS id, employee.first_name AS first_name, employee.last_name AS last_name, 
        role.title AS role_id, department.name AS name, role.salary AS salary, 
        CONCAT(manager.first_name, " ", manager.last_name) AS manager_name
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON manager.id = employee.manager_id`
        const labelArray = ["ID", "FIRST NAME", "LAST NAME", "ROLE", "DEPARTMENT", "SALARY", "MANAGER"];
        const callback = (item) => {
            return [item.id, item.first_name, item.last_name, item.role_id, item.name, item.salary, item.manager_name]
        };

        this.getResults(sql, labelArray, callback)
    }

    // ****************** add functions ****************** //
    async addDepartment() {
        const addDepName = await inquirer.prompt([
            {
                type: "input",
                name: "depName",
                message: "What is the name of the department?",
            }
        ])

        const sql = `INSERT INTO department (name)
            VALUES (?)`;
        const params = [addDepName.depName];

        db.query(sql, params)

        this.menuSelection();
    }

    async addRole() {
        const addRoleInfo = await inquirer.prompt([
            {
                type: "input",
                name: "roleName",
                message: "What is the name of the role?",
            },
            {
                type: "input",
                name: "roleSalary",
                message: "What is the salary of the role?",
            },
            {
                // todo need a way to get this to show you what the id's are of the departments 
                type: "list",
                name: "roleDep",
                message: "What is the department of this role?",
                choices: this.getDepartmentIDArray
            }
        ])

        // const sql = `INSERT INTO role (title, salary, department_id)
        // VALUES (?, ?, ?)`;

        // const params = [addRoleInfo.roleName, addRoleInfo.roleSalary, roleDepID(addRoleInfo.roleDep)];

        const roleDepID = (roleDep) => {
            const sample = "3 Customer Service";
            // make array on ""
            // split on " "
            // save first item in array
            // return that as a string 

        }

        // db.query(sql, params)

        // this.menuSelection();
    }

    async addEmployee() {
        const addEmpInfo = await inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?",
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?",
            },
            {
                type: "input",
                name: "role",
                message: "What is the employee's role?",
            },
            {
                type: "input",
                name: "manager",
                message: "Who is the employee's manager?",
            },
        ])
        // when adding a manager, show table of employees, have user enter manager number to add manager
         
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?, ?, ?, ?)`;
        const params = [addEmpInfo.firstName, addEmpInfo.lastName, addEmpInfo.role, addEmpInfo.manager];

        db.query(sql, params)

        this.menuSelection();
    }

    // ****************** update functions ****************** //
    updateEmpRole() {

    }

    // ******************** Utility functions ******************** //
    // helper function for the get functinos to post data into table
    async getResults(sql, labelArray, resultDataFunction) {
        try {    
            // puts the results of the query search in a variable 
            const results = await db.promise().query(sql);
    
            // the query search returns to items, the array we need is the first item. That gets set to a var
            const resultData = results[0];
    
            // puts label array and arrays from resultDataFunction in a array of arrays to be read by the console table
            let newArray = [labelArray, ...resultData.map(resultDataFunction)];
            // console.log(newArray);

            // displays in a table 
            console.log("\n");
            console.log(table(newArray));
    
            // callback to menu 
            this.menuSelection();
        } catch (err) {
            console.error(err);
        }
    }

    // helper function for addRole()
    async getDepartmentIDArray() {
        const depIdArray = [];

        // get data from department table
        const results = await db.promise().query(`SELECT * FROM department`);
        // console.log(results[0])

        // push department names to array
        results[0].forEach((item) => depIdArray.push(`${item.id} ${item.name}`))
        // console.log(depIdArray)

        return depIdArray;
    }

}

module.exports = Directory;