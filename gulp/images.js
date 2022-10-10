const settings = require('./gulp-config');
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");

const minifyImg = function () {
    return gulp
        .src(settings.paths.source.img)
        //.pipe(imagemin())
        .pipe(gulp.dest(settings.paths.destination.img));
}

module.exports = { minifyImg };