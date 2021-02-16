const request = require('supertest')('http://localhost:3000/api');
const expect = require('chai').expect;
const isSandboxEnvironment = require('../../helpers/isSandboxEnvironment');

it('should only test integration tests in the sandbox environment', async function() {
    if (!isSandboxEnvironment()) {
        this.skip();
    } else {
        const user = {
            uuid: '1b9d6bcdbbfd4b2d9b5dab8dfbbd4bed',
            username: 'jdoe@testemail.com',
            password: 'rawFakePassword'
        };
        let savedUser;
        let getUser = await request.get(`/v1/users/${user.uuid}`);
        if (!getUser.body.success) {
            getUser = await request.post(`/v1/users`)
                .send({ uuid: user.uuid, username: user.username, password: user.password });
            savedUser = getUser.body.data.user;
        } else {
            savedUser = getUser.body.data.user;
        }

        describe('routes/tasks', async () => {
            const task = {
                uuid: '1b9d6bcdbbfd4b2d9b5dab8dfbbd4wed',
                userUuid: savedUser.uuid,
                content: 'Go grocery shopping.'
            };
            describe('POST /v1/users/:userUuid/tasks', async () => {
                it('creates a new task for a specified user', async () => {
                    const response = await request.post(`/v1/users/${savedUser.uuid}/tasks`)
                        .send({
                            uuid: task.uuid,
                            content: task.content
                        });
                    const expected = {
                        isComplete: 0,
                        id: 1,
                        taskUuid: '1b9d6bcdbbfd4b2d9b5dab8dfbbd4wed',
                        userUuid: savedUser.uuid,
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
            describe('GET /v1/users/:userUuid/tasks', () => {
                it('returns tasks for specified user', async () => {
                    const response = await request.get(`/v1/users/${savedUser.uuid}/tasks`);
                    expect(response.status).to.eql(200);
                    expect(response.body.data.tasks.length).to.eql(1);
                });
            });
            describe('PUT /v1/users/:userUuid/tasks/:taskUuid', () => {
                it('updates task with new content', async () => {
                    const expectedContent = 'Walk the dogs.';
                    const response = await request.put(`/v1/users/${savedUser.uuid}/tasks/${task.uuid}`)
                        .send({ content: expectedContent });
                    expect(response.status).to.eql(200);
                    expect(response.body.data.task.uuid).to.eql(task.uuid);
                    expect(response.body.data.task.content).to.eql(expectedContent);

                });
                it('updates task with new complete status', async () => {
                    const expected = 1;
                    const response = await request.put(`/v1/users/${savedUser.uuid}/tasks/${task.uuid}`)
                        .send({ isComplete: 1 });
                    expect(response.status).to.eql(200);
                    expect(response.body.data.task.uuid).to.eql(task.uuid);
                    expect(response.body.data.task.isComplete).to.eql(expected);

                });

            });
            describe('DELETE /v1/users/:userUuid/tasks/:taskUuid', () => {
                it('deletes specified user and all their tasks', async () => {
                    const response = await request.delete(`/v1/users/${user.uuid}/tasks/${task.uuid}`);
                    expect(response.status).to.eql(200);
                });
            });
        });
    }
});
