"use strict";

const gulp = require("gulp");
const settings = require("./gulp/gulp-config");
const cleanup = require("./gulp/clean");
const htmlTask = require("./gulp/html");
const imgTask = require('./gulp/images');
const svgTask = require('./gulp/svg');
const lessTask = require('./gulp/less');
const scssTask = require('./gulp/scss');
const magentoTask = require("./gulp/magento");

// Watch src changes in src and compile dist
const watcher = (done) => {
	gulp.watch(settings.paths.source.html, htmlTask.compileHtml);
	gulp.watch(settings.paths.source.img, imgTask.minifyImg);
	gulp.watch(settings.paths.source.svg, svgTask.compile);
	gulp.watch(settings.paths.source.less, lessTask.compileLess);
	gulp.watch(settings.paths.source.scss, scssTask.compileScss);
	done();
};
// Watch magento changes in src and compile distMagento
const magentoWatcher = (done) => {
	gulp.watch(settings.paths.source.html, magentoTask.html);
	gulp.watch(settings.paths.source.less, magentoTask.less);
	gulp.watch(settings.paths.source.scss, magentoTask.scss);
	done();
}
// Erase magentoDist and compile it again
const magentoCompile = gulp.series(
	magentoTask.clean,
	magentoTask.html,
	magentoTask.less,
	magentoTask.scss
)
// clean dist
const clean = gulp.series(cleanup.clean);

// compile dist
const compile = gulp.series(
	htmlTask.compileHtml,
	imgTask.minifyImg,
	svgTask.compile,
	lessTask.compileLess,
	scssTask.compileScss
);
// watch and compile dist and distMagento
const watchMagento = gulp.series(watcher,magentoWatcher);
// watch and compile dist
const watch = gulp.series(watcher);
// Erase and compile everything
const build = gulp.series(clean, compile, magentoCompile);
// Erase and compile dist
const dev = gulp.series(clean, compile)

// dist
exports.default = watch; // yarn start
exports.dev = dev;       // yarn run-dev
// distMagento & dist
exports.magentowatch = watchMagento;	// yarn magento-w
exports.build = build;					// yarn build-all
