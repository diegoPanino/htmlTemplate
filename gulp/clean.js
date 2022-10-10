"use strict";

const del = require("del");
const settings = require("./gulp-config");

const clean = () => {
	return del([`${settings.paths.destination.root}/*`], { force: true });
};

module.exports = {
	clean: clean,
};
