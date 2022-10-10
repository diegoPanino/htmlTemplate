const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleancss = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const rename = require("gulp-rename");
const settings = require("./gulp-config");
const stylelint = require("gulp-stylelint");

const processors = [
	autoprefixer({
		flexbox: "no-2009",
		grid: true,
	}),
];

const compileScss = () => {
	return gulp
		.src(settings.paths.source.scss)
		.pipe(
			stylelint({
				reporters: [{ formatter: "verbose", console: true }],
				fix: true,
			})
		)
		.pipe(sourcemaps.init())
		.pipe(
			sass({
				outputStyle: "expanded",
			})
		)
		.on("error", sass.logError)
		.pipe(postcss(processors))
		.pipe(
			cleancss({
				level: 2,
			})
		)
		.pipe(
			rename({
				suffix: ".min",
				basename: "scssStyle",
			})
		)
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest(settings.paths.destination.style ));
};

module.exports = {
	compileScss,
};
