const inquirer = require('inquirer');
const fs = require('fs');

inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of your project.',
            validate: message => {
                if (!message) {
                    return 'No text entered. Enter the title of your project.';
                } else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Enter a description for your project.',
            validate: message => {
                if (!message) {
                    return 'No text entered. Enter a description for your project.';
                } else {
                    return true
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmInstall',
            message: 'Does your project need to be installed?',
            default: false
        },
        {
            type: 'input',
            name: 'installation',
            message: 'Enter a step-by-step description of how to install your project.',
            when: ({ confirmInstall }) => confirmInstall
        },
        {
            type: 'input',
            name: 'usage',
            message: 'Enter any information about the usage of your project.',
            validate: message => {
                if (!message) {
                    return 'No text entered. Enter any information about the usage of your project.';
                }
                else {
                    return true;
                }
            }
        }
    ])
    .then(answer => {
        fs.writeFile('./dist/README.md', JSON.stringify(answer), err => {
            if (err) throw err;
            else console.log('README.md printed!');
        });
    });