module.exports = function () {
    'user strict';

    var paths = require('./pather.js')();
    var config = require(paths.cwd + 'config');
    var exec = require('child_process').exec;

    /*
        This needs cleaned up. I like http-server, but I feel like this isn't the best module
        for the job. Something with an actual API would probably be far superior to it for this
        use-case.
    */

    // run http-server on the cd
    var cmd = "http-server -a localhost -p 8000 -c-1";
    var child = exec(cmd,
      function(err, stdout, stderr) {
        if (err) {
            throw err;
        } else {
            console.log(stdout);
        }
    });
    // serve the app (this should probably be an -o option or similar)
    require('opn')("http://localhost:8000/" + config.output);
};