const initial = [
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
        type: 'confirm',
        name: 'confirmUsage',
        message: 'Is there any information a user or contributor needs to know to use this app?',
        default: false
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
        },
        when: ({ confirmUsage }) => confirmUsage
    },
    {
        type: 'confirm',
        name: 'confirmContribution',
        message:'Do you want others to be able to contribute to this project?',
        default: false
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'Enter any contribution guidelines you may have.',
        validate: message => {
            if (!message) {
                return 'No text entered. Enter any contribution guidelines you may have.'
            } else {
                return true;
            }
        },
        when: ({ confirmContribution }) => confirmContribution
    },
    {
        type: 'confirm',
        name: 'confirmTest',
        message: 'Do you have any tests to offer to contributors to make sure their code works?',
        default: false
    },
    {
        type: 'input',
        name: 'test',
        message: 'Enter any test instructions you may have.',
        validate: message => {
            if (!message) {
                return 'No text entered. Enter any contribution guidelines you may have.'
            } else {
                return true;
            }
        },
        when: ({ confirmTest }) => confirmTest
    },
    {
        type: 'list',
        name: 'license',
        message: 'Which license does your project fall under?',
        choices: [
            'Apache License 2.0',
            'GNU General Public License v3.0',
            'MIT License',
            "BSD 2-Clause 'Simplified' License",
            "BSD 3-Clause 'New' or 'Revised' License",
            'Boost Software License 1.0',
            'Creative Commons Zero v1.0 Universal',
            'Elipse Public License 2.0',
            'GNU Affero General Public License v3.0',
            'GNU General Public License v2.0',
            'GNU Lesser General Public License v2.1',
            'Mozilla Public License 2.0',
            'ISC License',
            'The Unlicense'
        ]
    },
    {
        type: 'input',
        name: 'username',
        message: 'What is the GitHub username this project is hosted with?',
        validate: message => {
            if (!message) {
                return 'No text entered. Enter the GitHub username this project is hosted with.';
            } else {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: 'Please enter an email address that other users can contact you from.',
        validate: message => {
            if (!message.includes('@') || !message.includes('.', 4)) {
                return 'Invalid email address. Please enter an email address that other users can contact you from.';
            } else {
                return true;
            }
        } 
    },
    {
        type: 'confirm',
        name: 'confirmFaq',
        message: 'Do you want to answer any final questions a user or contributor may have?',
        default: false
    },
    {
        type: 'input',
        name: 'faq',
        message: 'Enter any answers you wish to offer to users and contributors',
        validate: message => {
            if (!message) {
                return 'No text entered. Please enter any answers you wish t offer to users and contributors';
            } else {
                return true;
            }
        }
    }
];

module.exports = {
    initial: initial
};