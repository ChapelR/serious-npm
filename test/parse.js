// jshint node: true, mocha: true, esversion: 6
const md2json = require('../scripts/lib/parse.js');
const fs = require('fs-jetpack');
const assert = require('assert');

md2json('./test/in/', './test/out/');

const idx = fs.read('./test/out/index.json', 'json');
const ep = fs.read('./test/out/episodes/example-episode.json', 'json');

describe('markdown to JSON parser', () => {
    it('should generate a valid index.json file', () => {
        assert.strictEqual(idx.title, "Serious Fiction");
        assert.strictEqual(idx.posts, "episodes");
        assert.strictEqual(idx.recentMax, 5);
        assert.ok(idx.cookiesWarning);
    });
    it('should generate valid episode json', () => {
        assert.strictEqual(ep.data.title, "Example Episode");
        assert.strictEqual(ep.data.episode, 3);
        assert.strictEqual(ep.data.filename, 'example-episode.json');
    });
});