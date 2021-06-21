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
                return true;
            }
        }
    },
    {
        type: 'confirm',
        name: 'confirmInstall',
        message: 'Does your project need to be installed?',
        default: false
    }
];

const remainder = [
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
        name: 'confirmContribute',
        message:'Do you want others to be able to contribute to this project?',
        default: false
    },
    {
        type: 'checkbox',
        name: 'contribute',
        message: 'Which ways can someone contribute to this project?',
        choices: ['Submit bugs and feature requests', 'Review source code changes', 'Write code and make pull requests', 'Other'],
        when: ({ confirmContribute }) => confirmContribute,
    },
    {
        type: 'input',
        name: 'contributionOther',
        message: 'What other way can a user contribute?',
        validate: message => {
            if (!message) {
                return 'No text entered. What other way can a user contribute?';
            } else {
                return true;
            }
        },
        when: ({ confirmContribute, contribute }) => confirmContribute ? contribute.includes('Other') : false   
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
                return 'No text entered. Enter any contribution guidelines you may have.';
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
            const domain = message.slice(message.lastIndexOf('.'));

            if (!message.includes('@') || (domain !== '.com' && domain !== '.ca' && domain !== '.org' && domain !== '.edu')) {
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
    }
];

module.exports = { remainder, initial };