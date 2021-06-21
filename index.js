const inquirer = require('inquirer');
const { printFile, isImageFile } = require('./utils/fsStuff');
const generateReadme = require('./src/generate-readme');
const questions = require('./utils/questions');

const promptInitial = () => inquirer.prompt(questions.initial);

// The installation prompt, allowing the user to add as many steps for installation as necessary
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

// Checks to see if the user wants to put a preview image in their README. It also makes sure that their preview image is, in fact, an image file that they actually have on their computer.
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

                if (!isImageFile(message)) {
                    return 'Invalid directory. Please enter the directory of the desired image.';
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

// Asks the remaining simple questions to the user. These are things like usage guidelines, test guidelines, contribution methods, etc.
const promptRemainder = answers => { 
    return inquirer.prompt(questions.remainder)
        .then(remainder => {
            answers.remainder = remainder;
            return answers;
        });
};

// Asks the user for their FAQ input. The user can add as many question and answer pairs as they want to their README.
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

// Step by step. First, the questions begin;
promptInitial()
// Then, we go to questions about the installation process
    .then(answers => answers.confirmInstall ? promptInstall(answers, 0) : answers)
// Then, we ask if the user wants a preview image
    .then(answers => promptImage(answers))
// Then, we ask the remainder of the simpler-format questions
    .then(answers => promptRemainder(answers))
// Then, we ask if the user wants an FAQ
    .then(answers => answers.remainder.confirmFaq ? promptFaq(answers) : answers)
// Then, we generate the text based on their input
    .then(answers => generateReadme(answers))
// Then, we print and save that text in a README.md file
    .then(readMeTemplate => {
        printFile(readMeTemplate);
        console.log('README.md printed!');
    });