const inquirer = require('inquirer');
const fs = require('fs');
const generateReadme = require('./utils/generate-readme');
const questions = require('./utils/questions');

const userInput = function() {
    return inquirer
    .prompt(questions.initial)
};
// First, we get user input
userInput()
    .then(answers => {
        return generateReadme(answers)
    })
    .then(readMeTemplate => {
        fs.writeFile('./dist/README.md', readMeTemplate, err => {
            if (err) throw err;
            else console.log('README.md printed!');
        });
    });