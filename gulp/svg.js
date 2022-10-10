"use strict";

const gulp = require("gulp");
const svgsprite = require("gulp-svg-sprite");
const buffer = require("vinyl-buffer");
const rename = require("gulp-rename");
const settings = require("./gulp-config");

const svg = () => {
	return gulp
		.src(settings.paths.source.svg)
		.pipe(buffer())
		.pipe(
			rename((opt) => {
				opt.basename = opt.basename.replace(/_/g, "-");
				return opt;
			})
		)
		.pipe(
			svgsprite({
				mode: {
					symbol: {
						render: {
							css: false,
							scss: false,
						},
						dest: "./",
						prefix: ".svg--%s",
						sprite: "sprite.svg",
						example: true,
					},
				},
			})
		)
		.pipe(gulp.dest(settings.paths.destination.svg));
};

module.exports = {
	compile: svg,
};
