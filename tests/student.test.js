const request = require('supertest');
const app = require('../app');
const mongoose = require("mongoose");

describe('Get feedback', function () {
    it('should require authorization', function (done) {
        request(app)
            .get('/api/feedback')
            .expect(401)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
})

describe('Get group members', function () {
    it('should require authorization', function (done) {
        request(app)
            .get('/api/groups/group-members')
            .expect(401)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
})


