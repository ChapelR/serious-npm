module.exports = function () {
    'use strict';

    var paths = require('./pather.js')();
    var config = require(paths.cwd + 'config.json');
    var jetpack = require('fs-jetpack');

    // remove the content folder, which contains the markdown JSON data
    jetpack.remove(config.output + 'content');
};