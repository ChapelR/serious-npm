module.exports = function () {
    'use strict';

    var md2json = require('./lib/parse.js');
    var jetpack = require('fs-jetpack');
    var paths = require('./pather.js')();
    var config = require(paths.cwd + 'config.json');

    var idx = jetpack.read(paths.lib + 'index.tpl', 'utf8');

    // debug mode
    idx = idx.replace(/{{debug}}/, config.debug ? 'on' : 'off');

    // add site description
    idx = idx.replace(/{{description}}/g, config.description || '');

    // google analytics id
    idx = idx.replace(/{{tracking-id}}/g, config.googleAnalytics || '');
    if (config.googleAnalytics) {
        idx = idx.replace(/<!--analytics/, '');
        idx = idx.replace(/analytics-->/, '');
    }

    // cookies warning
    if (config.cookiesWarning) {
        idx = idx.replace(/<!--cookies/, '');
        idx = idx.replace(/cookies-->/, '');
    }

    // write to file
    jetpack.write(config.output + '/index.html', idx, { atomic : true });

    // add blank theme (if no theme.css exists)
    jetpack.copy(paths.lib + '/theme.txt', config.output + '/theme.css', { overwrite : function () {
        return false;
    }});

    // compile markdown and write
    md2json(config.input, config.output + '/content');
};