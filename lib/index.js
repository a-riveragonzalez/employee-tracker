const inquirer = require("inquirer");


class Directory {
    // do i need anything here? maybe..?
    constructor(){
        this.answer = "";
    }

    // todo make this an async function (while loop)
    // switch case , give each case it's own function 
    async testIfWorks(){
        let questioning = true;

        while (questioning) {
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
                    console.log("yay I WORK")
                    break;
                case "view all roles": 
                    break;
                case "view all employees": 
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
        
    }


}

module.exports = Directory;