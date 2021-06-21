const inquirer = require('inquirer');
const fs = require('fs');
const generateReadme = require('./utils/generate-readme');
const questions = require('./utils/questions');

const promptInitial = () => inquirer.prompt(questions.initial);

const promptInstall = (answers, index) => {
    if (!answers.installation) {
        console.log(`
        ====================
         Installation Steps
        ====================
        `); 
        answers.installation = [];
    }
    return inquirer
        .prompt([            
            {
                type: 'input',
                name: `step${index}`,
                message: 'Enter the next step in the installation process.',
                validate: message => {
                    if (!message) {
                        return 'No text entered. Enter the next step in the installation process';
                    } else {
                        return true;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'moreSteps',
                message: 'Is there another step to installation?',
                default: false
            }
        ])
        .then(installStep => {
            answers.installation.push(installStep[`step${index}`]);
            return installStep.moreSteps ? promptInstall(answers, index++) : answers;
    });
};

const promptImage = answers => {
    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirmImage',
            message: 'Do you have a preview image to add to the README?',
            default: false
        },
        {
            type: 'input',
            name: 'image',
            message: 'Please enter the directory of the desired image.',
            when: ({ confirmImage }) => confirmImage,
            validate: message => {
                const type = message.slice(message.lastIndexOf('.'));
                console.log(type === '.gif')
                if (!fs.statSync(message).isFile()) {
                    return 'Invalid directory. Please enter the directory of the desired image.'
                } else if (type !== '.jpg' && type !== '.png' && type !== '.jpeg' && type !== '.svg' && type !== '.gif' && type !== '.bmp') {
                    return 'Invalid file selection. Please enter the directory of the desired image.';
                } else {
                    return true;
                }
            }
        }
    ]).then(image => {
        answers.image = image;
        return answers;
    });
};

const promptRemainder = answers => { 
    return inquirer.prompt(questions.remainder)
        .then(remainder => {
            answers.remainder = remainder;
            return answers;
        });
};

const promptFaq = answers => {
    if (!answers.faqs) {
        console.log(`
       ============================
        Frequently Asked Questions
       ============================
        `)
        answers.faqs = [];
    }
    return inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'question',
                    message: 'Type a question that a user might or should ask.',
                    validate: message => {
                        if (!message) {
                            return 'No text entered. Type a question that a user might or should ask.';
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'answer',
                    message: 'Now type an answer to the previous question.',
                    validate: message => {
                        if (!message) {
                            return 'No text entered. Type an answer to the previous question.'
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: 'confirm',
                    name: 'moreQuestions',
                    message: 'Do you have more questions to add?',
                    default: false
                }
            ]).then(faq => {
                answers.faqs.push(faq);
                return faq.moreQuestions ? promptFaq(answers) : answers;
            });
};

// Step by step
promptInitial()
    .then(answers => answers.confirmInstall ? promptInstall(answers, 0) : answers)
    .then(answers => promptImage(answers))
    .then(answers => promptRemainder(answers))
    .then(answers => answers.confirmFaq ? promptFaq(answers) : answers)
    .then(answers => generateReadme(answers))
    .then(readMeTemplate => {
        fs.writeFile('./dist/README.md', readMeTemplate, err => {
            if (err) throw err;
            else console.log('README.md printed!');
        });
    });