'use strict';

var matter = require('gray-matter');
var filenamify = require('filenamify');
var jetpack = require('fs-jetpack');
var paths = require('../pather.js')();
/* istanbul ignore next */
try {
    var config = require(paths.cwd + 'config.json');
} catch (err) {
    var config = {};
}

var normalize = function (string) {
    // normalize file names
    var ret = filenamify(string, { replacement : '-' });
    return ret.trim().toLowerCase().replace(/\s+/g, '-');
};

var isMeta = function (ep) {
    // is this a 'meta' post or an episode?
    return typeof ep.data.episode === 'string' && ep.data.episode.trim().toLowerCase() === 'meta';
};

var reader = {
    getFiles : function (inPath) {
        // get all the markdown files in the source directory
        return jetpack.find(inPath, { matching : '**/*.md' });
    },
    read : function (file) {
        return jetpack.read(file, 'utf8');
    },
    write : function (obj, path, file) {
        if (!file) {
            // if there's no "file" arg, then it's a post
            if (isMeta(obj)) {
                path = path + '/meta/' + obj.data.filename;
            } else {
                path = path + '/episodes/' + obj.data.filename;
            }
        } else {
            // save the file, which is the `index.json` file
            path = path + '/' + file;
        }
        // write in atomic mode just in case
        jetpack.write(path, obj, { atomic : true });
    }
};

function parseFiles (array) {
    return array.map( function (file) {
        return matter(reader.read(file));
    });
}

function createIndex (episodes, path) {
    // basic `index.json` structure
    var index = Object.assign({ story : [], meta : [] }, config);

    episodes.forEach( function (ep) {
        /* istanbul ignore next */
        if (index.story.find( function (ind) {
            // check if the episode name already exists in the index
            return ep.episode === ind.episode;
        })) {
            // can't have two episodes with same name!
            throw new Error('Found two episodes with the same number: "' + ep.episode + '".');
        }

        // create a filename for the post
        var filename = normalize(ep.data.title) + '.json';
        ep.data.filename = filename;

        if (isMeta(ep)) {
            // create a meta post
            var id = normalize(ep.data.title);
            index.meta.push({
                title : ep.data.title,
                description : ep.data.description,
                episode : 'meta:' + id,
                id : id,
                meta : true,
                file : filename,
                link : ep.data.link || ep.data.title,
                label : ep.data.label
            });
        } else {
            // create an episode
            index.story.push({
                title : ep.data.title,
                description : ep.data.description,
                episode : Number(ep.data.episode),
                file : filename
            });
        }
        // write the episode data to a JSON file
        reader.write(ep, path);
    });
    index.story.sort( function (a, b) {
        // sort the episodes by number
        return a.episode - b.episode;
    });
    // write the `index.json` file
    reader.write(index, path, 'index.json');
}

function mdToJson (inPath, outPath) {
    // the main function
    var eps = parseFiles(reader.getFiles(inPath));
    createIndex(eps, outPath);
}

module.exports = mdToJson;