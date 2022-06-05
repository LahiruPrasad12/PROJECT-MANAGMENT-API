const request = require('supertest');
const app = require('../app');
const mongoose = require("mongoose");

describe('Send feedback', function () {
    it('should require authorization', function (done) {
        request(app)
            .post('/api/feedback')
            .send({
                type: "group",
                message: "this is message",
                receiver_id: "628b1d5f5ab2a23af8b359ab"
            })
            .expect(401)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
    });
})
