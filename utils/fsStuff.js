const fs = require('fs');

const printFile = fileContent => {
    return new Promise( (resolve, reject) => {
        fs.writeFile('./dist/README.md', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }
            
            resolve({
                ok: true,
                message: 'README printed!'
            })
        });
    });
};

const copyFile = (directory, type) => {
    return new Promise( (resolve, reject) => {
        fs.copyFile(directory, `./dist/preview${type}`, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'Image imported!'
            });
        });
    });
};

const isImageFile = file => fs.statSync(file).isFile();

module.exports = { printFile, copyFile, isImageFile }