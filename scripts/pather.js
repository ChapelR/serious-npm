module.exports = function () {
    'use strict';
    
    var path = require('path');

    // get base path
    var base = path.dirname(require.main.filename);
    var arr = base.split(path.sep);
    arr.pop();
    base = arr.join(path.sep);

    // return all paths
    return {
        base,
        sep     : path.sep,
        nm      : base + path.sep + 'node_modules' + path.sep, 
        bin     : base + path.sep + 'bin' + path.sep,
        scripts : base + path.sep + 'scripts' + path.sep,
        lib     : base + path.sep + 'scripts' + path.sep + 'lib' + path.sep,
        cwd     : process.cwd() + path.sep
    };
};