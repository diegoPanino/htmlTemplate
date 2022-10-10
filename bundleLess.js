const path = require("path");
const settings = require('./gulp/gulp-config');
const bundle = require("less-bundle");
const srcFile = path.join(__dirname, "./src/less/style.less");
const destFile = path.join(__dirname, settings.paths.magento.destination.style)

bundle(
	{
		src: srcFile,
		dest: path.join(destFile, "./bundle.less"),
	},
    function (err, data) {
        if(err)
            console.error("Less Error Bundle", err, data);
        else
            console.log("\x1b[32m%s\x1b[0m", "Bundle LESS succed");
	}
);
