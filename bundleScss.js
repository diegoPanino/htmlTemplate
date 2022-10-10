const bundleScss = require("bundle-scss");
const settings = require('./gulp/gulp-config');
const path = require('path');

const source = "./src/scss/style.scss";
const dest = path.join(__dirname, settings.paths.magento.destination.style);
const destFile = path.join(dest, "./bundle.scss");


bundleScss(source, destFile)
    .then(result => {
        if (result.length <= 0) throw new Error('Empty File');
        console.log("\x1b[32m%s\x1b[0m", "Bundle SCSS succed");
    })
    .catch(error => {
        if (error != 'Error: Empty File')         
            console.error("\x1b[31m%s\x1b[0m", "Bundle SCSS error: ", error);
        else    
            console.log('\x1b[35m%s\x1b[0m', 'Bundle SCSS empty destination file, check source.');
        })
    