// Badges are from here! https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
const badges = require('./badges.json');

function generateReadme(userInput) {
    const { title, description, confirmInstall, installation, usage, contribution, test, license, ...contact } = userInput;
    
    // The license and badge stuff. Done before the title because the badge is at the top
    const badge = badges[license];
    const licenseUrl = badge.split(')](')[1];
    
    // The title
    const beginning =  
    `# ${title.toUpperCase()} ${badge}
## Description
${description}`;

    // The test for installing stuff
    const installText = confirmInstall ? `Installation \n ${installation}` : '';

    // Putting the whole section together
    return `${beginning}
## Table of Contents
${installText}
## Usage Guidelines
${usage}
## License
This software is offered under the ${license}. For more information on conditions of use, [follow this link.](${licenseUrl}
## Contributing
${contribution}
## Tests
${test}
## Questions
If you need to reach me, my GitHub username is ${contact.username} and my email address is ${contact.email}.
    `;
};

module.exports = generateReadme;