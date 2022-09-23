const inquirer = require("inquirer");
const mysql = require('mysql2');
const { table } = require('table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      password: 'superlame',
      database: 'store_db'
    },
    console.log(`Connected to the store_db database.`)
);

class Directory {
    // do i need anything here? maybe..?
    constructor(){
        this.answer = "";
    }

    // *********************** Init Function *********************** //
    async menuSelection(){
        this.displayTitle();

        const menuQuestion = await inquirer.prompt([
            {
                type: "list",
                name: "options",
                message: "What would you like to do?",                    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "exit"]
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
                break;
            case "add a role": 
                break;
            case "add an employee": 
                break;
            case "update an employee role": 
                break;
            case "exit": 
                questioning = false;
                break;
        }
    }
 
    // ************* function to display the title ************* //
    displayTitle() {
        const config = {
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

        console.log(table(title, config));
    }

    // ****************** view functions ****************** //
    getDepartments() { 
        const sql = `SELECT * FROM department`;
        db.query(sql, function (err, results) {
            console.log(results);
        });
        this.menuSelection();
    }

    getRoles() { 
        const sql = `SELECT * FROM role`;
        db.query(sql, function (err, results) {
            console.log(results);
        });
        this.menuSelection();
    }

    getEmployees() { 
        const sql = `SELECT * FROM employee`;
        db.query(sql, function (err, results) {
            console.log(results);
        });
        this.menuSelection();
    }

    // ****************** add functions ****************** //
    addDepartment() {
        // add thing
        // display thing 
    }

    // when adding a manager, show table of employees, have user enter manager number to add manager 

}

module.exports = Directory;