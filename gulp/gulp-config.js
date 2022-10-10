const path = require("path");

const dest = "dist";
const magento = "distMagento";

const sourceHtml = ["src/html/**/*{.html,.njk}"];
const sourceHtmlPages = ["src/html/pages/*.{html,.njk}"];
const sourceHtmlTemplate = "src/html/";

const sourceImg = ['src/media/images/**/*'];
const sourceSvg = ['src/media/icons/**/*'];

const sourceLess = ['src/less/**/*.less'];
const sourceScss = ['src/scss/**/*.scss'];


module.exports = {
	paths: {
		source: {
                  html: sourceHtml,
                  htmlPages: sourceHtmlPages,
                  htmlTemplate: sourceHtmlTemplate,
                  img: sourceImg,
                  svg:sourceSvg,
                  less:sourceLess,
                  scss:sourceScss,
                  
		},
		destination: {
                  root: dest,
                  img: dest + '/media/images',
                  svg: dest + '/media/images',
                  less: dest + '/less',
                  scss: dest + '/scss',
                  style: dest + '/style'
		},
        magento: {
            destination: {   
                root: magento,
                html: magento + "/html",
                style: magento + "/style",
                less: magento + "/style/less",
                scss: magento + "/style/scss",
                css: magento + "/style/css",
            }
		},
	},
};
