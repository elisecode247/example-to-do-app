/* eslint-disable no-console */
const expect = require('chai').expect;
const sinon = require('sinon');
const authentication = require('../../authentication');

const user = {
    uuid: '3b9d6bcdbbfd4b2d9b5dab8dfbbd4bef',
    username: 'jdoeindextest@testemail.com',
    password: 'rawFakePassword'
};

const user2 = {
    uuid: '3b9d6bcdbbfd4b2d9b5dab8dfbbd4123',
    username: 'jdoeindextestuser2@testemail.com',
    password: 'rawFakePassword'
};

const sandbox = sinon.createSandbox();
sandbox.stub(authentication, 'ensureAuthenticated').callsFake(async (req, res, next) => {
    return await authentication.ensureAuthenticated({...req, user, isAuthenticated: ()=>(true)}, res, next);
});
sandbox.stub(authentication, 'ensureAuthorized').callsFake(async (req, res, next) => {
    return await authentication.ensureAuthorized({...req, user}, res, next);
});

const server = require('../../../server');
const request = require('supertest').agent(server);

describe('routes/index', async () => {

    before(async () => {
        await request.get('/');
    });

    after(async () => {
        await request.delete('/v1/users/' + user.uuid);
        server.close();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('bad url', () => {
        it('returns 404 error for bad route', async () => {

            const response = await request.get('/api/v1/userBadRequest');
            expect(response.status).to.eql(404);
        });
    });

    describe('authorization', () => {
        it('returns 403 for unauthorized user', async () => {
            const response = await request.get(`/api/v1/users/${user2.uuid}`);
            expect(response.status).to.eql(403);
        });

        it('returns 200 for authorized user', async () => {
            await request.post(`/api/v1/users`)
                .send({ uuid: user.uuid, username: user.username, password: user.password });
            const response = await request.get(`/api/v1/users/${user.uuid}`);
            expect(response.status).to.eql(200);
        });

    });
});
