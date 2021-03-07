/* eslint-disable no-console */
const expect = require('chai').expect;

const user = {
    uuid: '3b9d6bcdbbfd4b2d9b5dab8dfbbd4bef',
    username: 'jdoeusertest1@testemail.com',
    password: 'rawFakePassword'
};

const server = require('../../../server');
const request = require('supertest').agent(server);

describe('routes/users', async () => {

    after(async () => {
        await request.delete('/v1/users/' + user.uuid);
        server.close();
    });

    describe.skip('POST /api/v1/users/:userUuid', () => {
        it('creates a new user and returns new user uuid', async () => {
            const response = await request.post(`/api/v1/users/`)
                .send({ uuid: user.uuid, username: user.username, password: user.password });
            expect(response.status).to.eql(200);
            expect(response.body.success).to.eql(true);
            expect(response.body.data.user.uuid).to.eql(user.uuid);
        });
    });
    describe('GET /api/v1/users/:userUuid', () => {
        it('returns data for specified user', async () => {
            const response = await request.get('/api/v1/users/' + user.uuid);
            expect(response.status).to.eql(200);
            expect(response.body.data.user.uuid).to.eql(user.uuid);
        });
    });
    describe('PUT /api/v1/users/:userUuid', () => {
        it('updates user with new password', async () => {
            const response = await request.put('/api/v1/users/' + user.uuid)
                .send({ password: 'newFakePassword1234' });
            expect(response.status).to.eql(200);
            expect(response.body.data.user.uuid).to.eql(user.uuid);
        });
        it('throws error if request is for new username', async () => {
            const response = await request.put('/api/v1/users/' + user.uuid)
                .send({ username: 'newReplacementUsername' });

            expect(response.status).to.eql(403);
            expect(response.body.success).to.eql(false);
            expect(response.body.error.status).to.eql(403);
            expect(response.body.error.message).to.eql('cannot change password');
        });
    });
    describe('DELETE /api/v1/users/:userUuid', () => {
        it('deletes specified user and all their tasks', async () => {
            const response = await request.delete('/api/v1/users/' + user.uuid);
            expect(response.status).to.eql(302);
        });
    });

});
