const request = require('supertest');
const app = require('../src/app');

const propsRoute = '/public/api/config/props';

it('should return 200 requesting okta app id', async () => {
    await request(app)
        .get(propsRoute)
        .expect(200);
});

it('should return the oktaId object from env variable oktaID', async () => {
    process.env.Audience = 'test Okta App Id';

    const res = await request(app).get(propsRoute);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ jwtAud: process.env.Audience });
});