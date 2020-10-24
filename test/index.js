'use strict';

const app = require('../app');
const request = require('supertest')(app);
const sinon = require('sinon');
const Openings = require('../models/openings');
const expect = require('chai').expect;

describe('GET/login', function () {

    it('/login should return 200 ok', function () {
        request.get('/login')
            .expect(200)
            .expect('Content-Type', /html/)
            .end(function (err, res) {
                if (err) throw err;
            })
    })
})

describe('GET/register', function () {

    it('/register should return 200 ok', function () {
        request.get('/register')
            .expect(200)
            .expect('Content-Type', /html/)
            .end(function (err, res) {
                if (err) throw err;
            })
    })
})

describe('GET/add', function () {

    it('/add should return 302', function (done) {
        request.get('/openings/add')
            .expect(302, done)
    })
})

describe('GET/add/id', function () {

    it('/add/id should return 302', function (done) {
        request.get('/openings/add/3213948')
            .expect(302, done)
    })
})

describe('GET/openings', function () {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODFkNzgwNmUyNjNlODQwYzlhNjkzNyIsInVzZXJuYW1lIjoiZGl2ZXNoMjEyIiwiaXNNYW5hZ2VyIjp0cnVlLCJpYXQiOjE2MDM1NDUzNjJ9.uPVZl6Whj3xaeGsyziBiMGZBr2_5fpX0qubTuPaln8o";
    it('/openings should return 200', function (done) {
        request.get('/openings')
            .set('Cookie', ['token=' + token])
            .expect(200, done)
    })

    it('/add should return 200', function (done) {
        request.get('/openings/add')
            .set('Cookie', ['token=' + token])
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done();
            })
    })
})

describe('GET opening by id', function () {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmODFkNzgwNmUyNjNlODQwYzlhNjkzNyIsInVzZXJuYW1lIjoiZGl2ZXNoMjEyIiwiaXNNYW5hZ2VyIjp0cnVlLCJpYXQiOjE2MDM1NDUzNjJ9.uPVZl6Whj3xaeGsyziBiMGZBr2_5fpX0qubTuPaln8o";

    const opening = {
        _id: "1234",
        project: "project",
        client: "client",
        technologies: "tech",
        isOpen: true,
        role: "Backend Developer"
    }

    sinon.stub(Openings, 'findById');
    Openings.findById.returns(opening);

    it('/opening/id should return 200', function (done) {

        request.get('/openings/1234')
            .set('Cookie', ['token=' + token])
            .expect(200, done)
    })

    it('/add/id should return 200', function (done) {

        request.get('/openings/add/3213948')
            .set('Cookie', ['token='+token])
            .expect(200, done)
    })
})