var after = require('after');
//var express = require('../app.js'),
var request = require('supertest');

require('../server.js');
request = request('http://localhost:3000');

describe('router', function () {

    describe('methods', function () {
        it('should return correct status code on /', function (done) {
            var cb = after(3, done);

            request
                .get('/')
                .expect(200, cb);

            request
                .delete('/')
                .expect(404, cb);

            request
                .post('/')
                .expect(404, cb);
        });

        it('should return correct status code on /projects', function (done) {
            var cb = after(3, done);

            request
                .get('/projects')
                .expect(200, cb);

            request
                .delete('/projects')
                .expect(404, cb);

            request
                .post('/projects')
                .expect(404, cb);
        });

        it('should return correct status code on /contrast', function (done) {
            var cb = after(3, done);

            request
                .get('/contrast')
                .expect(200, cb);

            request
                .delete('/contrast')
                .expect(404, cb);

            request
                .post('/contrast')
                .expect(404, cb);
        });

        it('should return correct status code on a nonexistent page', function (done) {
            var cb = after(3, done);

            request
                .get('/nonexistent')
                .expect(404, cb);

            request
                .delete('/nonexistent')
                .expect(404, cb);

            request
                .post('/nonexistent')
                .expect(404, cb);
        });
    });


});