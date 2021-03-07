/* eslint-disable no-console */
const expect = require('chai').expect;

const user = {
    uuid: '3b9d6bcdbbfd4b2d9b5dab8dfbbd4bef',
    username: 'jdoetasktest@testemail.com',
    password: 'rawFakePassword'
};

const task = {
    uuid: '1b9d6bcdbbfd4b2d9b5dab8dfbbd4wed',
    userUuid: user.uuid,
    content: 'Go grocery shopping.'
};

const server = require('../../../server');
const request = require('supertest').agent(server);

describe('routes/tasks', async () => {
    before(async () => {
        await request.post(`/api/v1/users`)
            .send({ uuid: user.uuid, username: user.username, password: user.password });
    });
    after(async () => {
        await request.delete('/v1/users/' + user.uuid);
        server.close();
    });

    describe('POST /api/v1/users/:userUuid/tasks', async () => {
        it('creates a new task for a specified user', async () => {

            const response = await request.post(`/api/v1/users/${user.uuid}/tasks`).send({
                uuid: task.uuid,
                content: task.content
            });

            const expected = {
                isComplete: 0,
                id: 1,
                taskUuid: '1b9d6bcdbbfd4b2d9b5dab8dfbbd4wed',
                userUuid: user.uuid,
                content: task.content
            };
            expect(response.status).to.eql(200);
            expect(response.body.success).to.eql(true);
            expect(response.body.data.task.isComplete).to.eql(expected.isComplete);
            expect(response.body.data.task.uuid).to.eql(expected.taskUuid);
            expect(response.body.data.task.userUuid).to.eql(expected.userUuid);
            expect(response.body.data.task.content).to.eql(expected.content);
        });
    });
    describe('GET /api/v1/users/:userUuid/tasks', () => {
        it('returns tasks for specified user', async () => {
            const response = await request.get(`/api/v1/users/${user.uuid}/tasks`);
            expect(response.status).to.eql(200);
            expect(response.body.data.tasks.length).to.eql(1);
        });
    });
    describe('PUT /api/v1/users/:userUuid/tasks/:taskUuid', () => {
        it('updates task with new content', async () => {
            const expectedContent = 'Walk the dogs.';
            const response = await request.put(`/api/v1/users/${user.uuid}/tasks/${task.uuid}`)
                .send({ content: expectedContent });
            expect(response.status).to.eql(200);
            expect(response.body.data.task.uuid).to.eql(task.uuid);
            expect(response.body.data.task.content).to.eql(expectedContent);

        });
        it('updates task with new complete status', async () => {
            const expected = 1;
            const response = await request.put(`/api/v1/users/${user.uuid}/tasks/${task.uuid}`)
                .send({ isComplete: 1 });
            expect(response.status).to.eql(200);
            expect(response.body.data.task.uuid).to.eql(task.uuid);
            expect(response.body.data.task.isComplete).to.eql(expected);

        });

    });
    describe('DELETE /api/v1/users/:userUuid/tasks/:taskUuid', () => {
        it('deletes specified user and all their tasks', async () => {
            const response = await request.delete(`/api/v1/users/${user.uuid}/tasks/${task.uuid}`);
            expect(response.status).to.eql(200);
        });
    });
});
