// Badges are from here! https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
const badges = require('./badges.json');

function generateReadme(userInput) {
    const { title, description, confirmInstall, installation, usage, contribution, test, license, ...contact } = userInput;
    
    // The license and badge stuff. Done before the title because the badge is at the top. The badges are from shields.io
    const badge = badges[license];
    const licenseUrl = badge.split(')](')[1];
    
    // The title
    const beginning =  
    `# ${title.toUpperCase()} ${badge}
## Description
${description}`;

    // The test for installing stuff
    const installText = confirmInstall ? `Installation \n ${installation}` : '';

    // Putting the table of contents together
    const tableOfContents =
`## Table of Contents
- ${confirmInstall ? `[Installation](#Installation)` : ``}
- [Usage](#Usage)
- [Contributing](#Contributing)
- [Tests](#Tests)
- [Questions](#Questions)
- [Code-of-Conduct](#Code-of-Conduct)
- [License](#License)`

    // Putting the whole section together
    return `${beginning}
${tableOfContents}
${confirmInstall ? `[Installation](#Installation)` : ``}
${installText}
## Usage
${usage}
## Contributing
${contribution}
## Tests
${test}
## Questions
If you need to reach me, my GitHub username (and a link to my profile page) is [${contact.username}](https://github.com/${contact.username}) and my email address is [${contact.email}](mailto:${contact.email}).
## Code-of-Conduct
### Contributor Covenant
We as members, contributors, and leaders pledge to make participation in our
community a harassment-free experience for everyone, regardless of age, body
size, visible or invisible disability, ethnicity, sex characteristics, gender
identity and expression, level of experience, education, socio-economic status,
nationality, personal appearance, race, caste, color, religion, or sexual identity
and orientation.

We pledge to act and interact in ways that contribute to an open, welcoming,
diverse, inclusive, and healthy community.
[click here to read the full code of conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/)
## License
This software is offered under the ${license}. For more information on conditions of use, [follow this link.](${licenseUrl}`;
};

module.exports = generateReadme;