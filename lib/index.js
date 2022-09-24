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
                break;
            case "add a role": 
                break;
            case "add an employee": 
                break;
            case "update an employee role": 
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
        const sql = `SELECT * FROM role`;
        const labelArray = ["ID", "TITLE", "SALARY", "DEPARTMENT ID"];
        const callback = (item) => {
            return [item.id, item.title, item.salary, item.department_id]
        };

        this.getResults(sql, labelArray, callback)
    }

    getEmployees() { 
        const sql = `SELECT * FROM employee`;
        const labelArray = ["ID", "FIRST NAME", "LAST NAME", "ROLE ID", "MANAGER ID"];
        const callback = (item) => {
            return [item.id, item.first_name, item.last_name, item.role_id, item.manager_id]
        };

        this.getResults(sql, labelArray, callback)
    }

    // ****************** add functions ****************** //
    addDepartment() {
        // add thing
        // display thing 
    }

    addRole() {

    }

    addEmployee() {

    }

    // when adding a manager, show table of employees, have user enter manager number to add manager 

    updateEmpRole() {

    }

    // ******************** Utility Methods ******************** //
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

}

module.exports = Directory;