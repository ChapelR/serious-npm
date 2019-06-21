(function () {
    'use strict';

    var htmlmin = require('html-minifier').minify;

    module.exports = function (input) {
        return htmlmin(input, {
            collapseWhitespace   : true,
            conservativeCollapse : true,
            removeComments       : true,
            minifyCSS            : true,
            minifyJS             : true
        });
    };
}());