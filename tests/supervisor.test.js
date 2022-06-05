const request = require('supertest');
const app = require('../app');
const mongoose = require("mongoose");

describe('Accept topic', function () {
    it('should require authorization', function (done) {
        request(app)
            .get('/api/supervisors')
            .expect(401)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
})
