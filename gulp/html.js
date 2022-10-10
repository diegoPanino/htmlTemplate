const settings = require("./gulp-config");
const gulp = require("gulp");
const nunjucks = require("gulp-nunjucks-render");

const compileHtml = function () {
    return gulp
        .src(settings.paths.source.htmlPages)
        .pipe(nunjucks({
            path: settings.paths.source.htmlTemplate
        }))
        .pipe(gulp.dest(settings.paths.destination.root));
};

module.exports = {compileHtml};
