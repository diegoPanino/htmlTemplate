const settings = require('./gulp-config');
const gulp = require('gulp');
const less = require('gulp-less');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const stylelint = require("gulp-stylelint");
const cleancss = require("gulp-clean-css");

const autoprefix = new LessAutoprefix({ browsers: ["last 2 versions"] });

const processors = [
	autoprefixer({
		flexbox: "no-2009",
		grid: true,
	}),
];


const compileLess = function () {
    return gulp
		.src(["src/less/style.less"])
		.pipe(sourcemaps.init())
		.pipe(
			stylelint({
				reporters: [{ formatter: "verbose", console: true }],
				fix: true,
			})
		)
		.pipe(
			less({
				plugins: [autoprefix],
			})
		)
		.pipe(postcss(processors))
		.pipe(
			rename({
				suffix: ".min",
				basename: "lessStyle",
			})
		)
		.pipe(cleancss({ compatibility: "ie8" }))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(settings.paths.destination.style));
};

module.exports = {compileLess}