import request from 'supertest';
import { Express } from 'express-serve-static-core';
import { app } from '../src';
import { after } from 'node:test';
let server: Express;
describe('APP should say "Hello World!"', () => {
    beforeAll(() => {
        server = app;
    });
    it('should return 200', (done) => {
        request(server)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).toMatchObject({ message: `Hello World!` });
                done();
            });
    });
    afterAll((done) => {
        server.disable;
        done();
    });
});
