module.exports = function () {
    'use strict';

    var md2json = require('./lib/parse.js');
    var jetpack = require('fs-jetpack');
    var minify = require('./min.js');
    var paths = require('./pather.js')();
    var config = require(paths.cwd + 'config.json');

    var template = jetpack.read(paths.lib + 'index.tpl', 'utf8'),
        html;

    // debug mode
    template = template.replace(/{{debug}}/, config.debug ? 'on' : 'off');

    // add site description
    template = template.replace(/{{description}}/g, config.description || '');

    // serious version -- which version/release tag to pull from the CDN and compile into the project
    var version = 'latest';
    if (config.version && typeof config.version === 'string') {
        version = config.version.trim().toLowerCase();
        if (version !== 'latest' || version.charAt(0) !== 'v') {
            version = 'latest';
        }
    }
    template = template.replace(/{{version}}/g, version || 'latest');

    // google analytics id
    template = template.replace(/{{tracking-id}}/g, config.googleAnalytics || '');
    if (config.googleAnalytics) {
        template = template.replace(/<!--analytics/, '');
        template = template.replace(/analytics-->/, '');
    }

    // cookies warning
    if (config.cookiesWarning) {
        template = template.replace(/<!--cookies/, '');
        template = template.replace(/cookies-->/, '');
    }

    html = minify(template);

    // write to file
    jetpack.write(config.output + '/index.html', html, { atomic : true });

    // add blank theme (if no theme.css exists)
    jetpack.copy(paths.lib + '/theme.txt', config.output + '/theme.css', { overwrite : function () {
        return false;
    }});

    // compile markdown and write
    md2json(config.input, config.output + '/content');
};