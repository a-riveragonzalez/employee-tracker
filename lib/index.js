const inquirer = require("inquirer");
const { table } = require('table');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


class Directory {
    // do i need anything here? maybe..?
    constructor(){
        this.answer = "";
    }

    // todo make this an async function (while loop)
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
                    console.log("yay I WORK");
                    this.getDepartments();
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

    // deal with view departments
    // ? fetch is not supported in node js. What do now?
    // ? maybe use npm node-fetch
    async getDepartments() { 
        await fetch('/api/departments', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }
    
    async renderDepartments() {
        let departments = this.getDepartments.json();
        console.log(departments);
    }

    getAndRenderDepartments() {
        getDepartments().then(renderDepartments);
        console.log("this alsoooo works!")
    }

}

module.exports = Directory;