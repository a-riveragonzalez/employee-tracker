const inquirer = require("inquirer");


class Directory {
    constructor(){
        this.answer = "";
    }


    // todo make this an async function (while loop)
    // switch case , give each case it's own function 
    testIfWorks(){
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "options",
                    message: "What would you like to do?",
                    choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "exit"]
                }
            ])
            .then((answer) => console.log(answer))
    }


}

module.exports = Directory;