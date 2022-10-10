const settings = require("./gulp-config");
const magentoSettings = require('./magento-config');
const gulp = require("gulp");
const nunjucks = require("gulp-nunjucks-render");
const mapS = require("map-stream");

const del = require("del");

const less = require("gulp-less");
const sass = require("gulp-sass")(require("sass"));
const LessAutoprefix = require("less-plugin-autoprefix");
const autoprefixer = require("autoprefixer");
const rename = require("gulp-rename");
const postcss = require("gulp-postcss");
const autoprefix = new LessAutoprefix({ browsers: ["last 2 versions"] });
const header = require('gulp-header');
const gulpif = require('gulp-if');

const img = {
    regExp: new RegExp(/src\s*=\s*["|']media\/images\/(.+?["|'])/gi),
    splitChar: '/',
    closeChar: '}}"',
    type:'images'
}
const svg = {
    regExp: new RegExp(/xlink:href\s*=\s*["|']media\/images\/sprite.svg#(.+?["|'])/gi),
    splitChar: '#',
    closeChar: '"}}',
    type:'svg'
}

// HTML Task
    // Change src of img tag with magento path
const editSrc = (file, cb, obj) => {
    const { regExp, splitChar, closeChar , type} = obj;
    let fileContent = file.contents.toString();
    let match, edit = false;
    do {
        match = regExp.exec(fileContent);
        if (match) {
            edit = true;
            const imgStr = match[0].split(splitChar);
            const imgName = imgStr[imgStr.length - 1].replace('"', "").replace("'", "");
            const newImg = magentoSettings[type] + imgName + closeChar;

            fileContent = fileContent.replace(match[0], newImg);
            file.contents = Buffer.from(fileContent, "utf-8");
        }
    } while (match);

    cb(null, file);
}; 

const magentoCompileHtml = function () {
	return gulp
		.src([...settings.paths.source.html, "!./src/html/templates/**"])
		.pipe(
			nunjucks({
				path: [settings.paths.source.htmlTemplate],
			})
		)
		.pipe(mapS((file, cb) => editSrc(file, cb , img)))
		.pipe(mapS((file, cb) => editSrc(file, cb , svg)))
		.pipe(gulp.dest(settings.paths.magento.destination.html));
};

// Style Task
// LESS

const processors = [
	autoprefixer({
		flexbox: "no-2009",
		grid: true,
	}),
];

const skipRootFile = function (file,ext) {
    const { basename } = file;
    const name = basename.split('.')[0];
    if (basename === 'style' + ext ||
        basename === 'variables' + ext) return false;
    return true;
}

const compileLessMagento = function () {
	return gulp
        .src(settings.paths.source.less)
        .pipe(gulpif((file)=>skipRootFile(file,'.less'),header('@import "../variables";\n')))
		.pipe(
			less({
				plugins: [autoprefix],
			})
		)
		// .pipe(
		// 	stylelint({
		// 		reporters: [{ formatter: stylelintLess, console: true }],
		// 		fix: true,
		// 	})
		// )
        .pipe(postcss(processors))
        .on('error',console.error)
		.pipe(gulp.dest(settings.paths.magento.destination.less))
};

// SASS

const compileScssMagento = function () {
    return gulp
		.src(settings.paths.source.scss)
		.pipe(
			rename(function (path) {
				path.basename = path.basename.split("_").join("");
				return path;
			})
		)
		.pipe(gulpif((file) => skipRootFile(file,'.scss'), header('@import "../variables";\n')))
		// .pipe(
		// 	stylelint({
		// 		reporters: [{ formatter: "verbose", console: true }],
		// 		fix: true,
		// 	})
		// )
		.pipe(
			sass({
				outputStyle: "expanded",
			})
		)
		.on("error", sass.logError)
		.pipe(gulp.dest(settings.paths.magento.destination.scss));
}

// JS Task

// Cleaning task
const cleanupMagento = () => {
	return del([`${settings.paths.magento.destination.root}/*`], { force: true });
};

module.exports = {
    html: magentoCompileHtml,
    clean: cleanupMagento,
    less: compileLessMagento,
    scss: compileScssMagento
}