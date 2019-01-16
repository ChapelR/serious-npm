module.exports = function () {
    'use strict';

    var jetpack = require('fs-jetpack');
    var paths = require('./pather.js')();

    function retFalse () {
        return false;
    }

    if (jetpack.exists(paths.cwd + 'config.json')) {
        // don't overwrite configs, ever
        console.log('Please delete the `config.json` file if you really want to reinitialize your project.');
    } else {
        // only overwrite if they don't exist
        jetpack.copy(paths.lib + 'config.txt', './config.json', { overwrite : retFalse });
        // the example episode may cause an error, since it's numbered "1". not sure how to address that yet
        jetpack.copy(paths.lib + 'example.md', './src/example.md', { overwrite : retFalse });
        jetpack.copy(paths.lib + 'about.md', './src/meta/about.md', { overwrite : retFalse });
    }
};