const request = require('supertest')('http://localhost:3000/api');
const expect = require('chai').expect;
const isSandboxEnvironment = require('../../helpers/isSandboxEnvironment');

it('should only test integration tests in the sandbox environment', function() {
    if (!isSandboxEnvironment()) {
        this.skip();
    } else {
        describe('routes/users', async () => {
            const user = {
                uuid: '1b9d6bcdbbfd4b2d9b5dab8dfbbd4bed',
                username: 'jdoe@testemail.com',
                password: 'rawFakePassword'
            };
            describe('POST /v1/users/:userUuid', () => {
                it('creates a new user and returns new user uuid', async () => {
                    let response = await request.get(`/v1/users/${user.uuid}`);
                    if (!response.body.success) {
                        response = await request.post(`/v1/users`)
                            .send({ uuid: user.uuid, username: user.username, password: user.password });
                    }

                    expect(response.status).to.eql(200);
                    expect(response.body.success).to.eql(true);
                    expect(response.body.data.user.uuid).to.eql(user.uuid);
                });
            });
            describe('GET /v1/users/', () => {
                it('returns all users', async () => {
                    const response = await request.get('/v1/users');
                    expect(response.status).to.eql(200);
                    expect(response.body.data.users.length).to.eql(1);
                });
            });
            describe('GET /v1/users/:userUuid', () => {
                it('returns data for specified user', async () => {
                    const response = await request.get('/v1/users/' + user.uuid);
                    expect(response.status).to.eql(200);
                    expect(response.body.data.user.uuid).to.eql(user.uuid);
                });
            });
            describe('PUT /v1/users/:userUuid', () => {
                it('updates user with new password', async () => {
                    const response = await request.put('/v1/users/' + user.uuid)
                        .send({ password: 'newFakePassword1234' });
                    expect(response.status).to.eql(200);
                    expect(response.body.data.user.uuid).to.eql(user.uuid);
                });
                it('throws error if request is for new username', async () => {
                    const response = await request.put('/v1/users/' + user.uuid)
                        .send({ username: 'newReplacementUsername' });

                    expect(response.status).to.eql(403);
                    expect(response.body.success).to.eql(false);
                    expect(response.body.error.status).to.eql(403);
                    expect(response.body.error.message).to.eql('cannot change password');
                });
            });
            describe('DELETE /v1/users/:userUuid', () => {
                it('deletes specified user and all their tasks', async () => {
                    const response = await request.delete('/v1/users/' + user.uuid);
                    expect(response.status).to.eql(302);
                });
            });
            describe('bad url', () => {
                it('returns 404 error for bad route', async () => {
                    const response = await request.get('/v1/userBadRequest');
                    expect(response.status).to.eql(404);
                });
            });
        });
    }
});
