// Badges are from here! https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba
const badges = require('./badges.json');
const fsStuff = require('./fsStuff');

// This function takes the image directory and copies the file into the distribution folder, then returns that new directory for the benefit of the readme
const imageUrl = image => {
    const type = image.slice(image.lastIndexOf('.'));
    fsStuff.copyFile(image, type);

    return `./preview${type}`;
};

// This function puts together contribution text
const contribText = (contribute, contributionOther) => {
    let text = "If you wish to contribute to this application's development, here are a few ways you can do so:";

    contribute.forEach(option => {
        if (option != 'Other') text += `
-${option}`
    });

    if (contribute.includes('Other')) text += `

${contributionOther}`

    return text;
};

// This function puts together installation text
const installText = installation => { 
    let text = 'To install this application, follow the below instructions:';

    installation.forEach(step => text += `
    - ${step}`)

    return text;
};

// This function puts together the FAQ text, if necessary
const faqsText = faqs => {
    let text = `
### Frequently Asked Questions`;

    faqs.forEach(faq => {
        text += `
#### ${faq.question}
${faq.answer}`
    });

    return text;
};

// The template function for the README
const generateReadme = userInput => {
    const { title, description, confirmInstall, installation, remainder, faqs, image } = userInput;
    const { confirmUsage, usage, confirmContribute, contribute, contributionOther, confirmTest, test, license, username, email, confirmFaq } = remainder;
    
    // The license and badge stuff. Done before the title because the badge is at the top. The badges are from shields.io
    const badge = badges[license];
    const licenseUrl = badge.split(')](')[1];

    // The title
    const beginning =  
    `# ${title.toUpperCase()} ${badge}
## Description
${description}`;

    // Putting the table of contents together
    const tableOfContents =
`## Table of Contents
${confirmInstall ? '- [Installation](#Installation)' : ''}
${confirmUsage ? '- [Usage](#Usage)' : ''}
${confirmContribute ? '- [Contribute](#Contribute)' : ''}
${confirmTest ? '- [Tests](#Tests)' : ''}
- [Questions](#Questions)
- [Code-of-Conduct](#Code-of-Conduct)
- [License](#License)`

    // Putting the whole section together
    return `${beginning}

![Preview image of the application](${imageUrl(image.image)})

${tableOfContents}

${confirmInstall ? `## Installation
${installText(installation)}` : ''}

${confirmUsage ? `## Usage
${usage}` : ''}

${confirmContribute ? `## Contribute
${contribText(contribute, contributionOther)}` : ''}

${confirmTest ? `## Tests
${test}` : ''}

## Questions
If you need to reach me, my GitHub username (and a link to my profile page) is [${username}](https://github.com/${username}) and my email address is [${email}](mailto:${email}).
${confirmFaq ? faqsText(faqs) : ''}

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
[Click here to read the full code of conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/)

## License
This software is offered under the ${license}. For more information on conditions of use, [follow this link.](${licenseUrl}.`;
};

module.exports = generateReadme;