module.exports = function () {
    'user strict';

    var paths = require('./pather.js')();
    var config = require(paths.cwd + 'config');
    var connect = require('connect');
    var serveStatic = require('serve-static');

    // run test server
    connect().use(serveStatic(paths.cwd)).listen(8000, function(){
        console.log('Server running on 8080...');
    });

    // serve the app (this should probably be an -o option or similar)
    require('open')("http://localhost:8000/" + config.output);
};