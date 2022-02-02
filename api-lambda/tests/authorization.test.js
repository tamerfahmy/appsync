const request = require('supertest');
const app = require('../src/app');
const jwt = require('jsonwebtoken');

const configRoute = '/api/config';

it('should return 401 when requesting config route without authorization header', async () => {
    await request(app)
        .get(configRoute)
        .expect(401);
});

it('should return 200 when valid token is passed', async () => {
    process.env.AppInfo = 'https://adidas.okta.com';
    process.env.Audience = 'sample audience';

    const token = jwt.sign({ exp: (Date.now() / 1000) + (60 * 60), iss: 'https://adidas.okta.com', aud: 'sample audience' }, 'any key');
    const authorization = `Bearer ${token}`;

    await request(app).get(configRoute)
        .set('authorization', authorization)
        .expect(200);
});

it('should return 500 when invalid token is passed', async () => {
    const invalidToken = 'invalid token';
    const authorization = `Bearer ${invalidToken}`;

    await request(app).get(configRoute)
        .set('authorization', authorization)
        .expect(500);
});

it('should return 401 when token with invalid issuer is passed', async () => {
    process.env.AppInfo = 'https://adidas.okta.com';
    process.env.Audience = 'sample audience';

    const token = jwt.sign({ exp: (Date.now() / 1000) + (60 * 60), iss: 'invalid issuer', aud: 'sample audience' }, 'any key');
    const authorization = `Bearer ${token}`;

    await request(app).get(configRoute)
        .set('authorization', authorization)
        .expect(401);
});

it('should return 401 when token with invalid audience is passed', async () => {
    process.env.AppInfo = 'https://adidas.okta.com';
    process.env.Audience = 'sample audience';

    const token = jwt.sign({ exp: (Date.now() / 1000) + (60 * 60), iss: 'https://adidas.okta.com', aud: 'another audience' }, 'any key');
    const authorization = `Bearer ${token}`;

    await request(app).get(configRoute)
        .set('authorization', authorization)
        .expect(401);
});

it('should return 401 when token with expired token passed', async () => {
    process.env.AppInfo = 'https://adidas.okta.com';
    process.env.Audience = 'sample audience';

    const token = jwt.sign({ exp: (Date.now() / 1000) - (60 * 60), iss: 'https://adidas.okta.com', aud: 'sample audience' }, 'any key');
    const authorization = `Bearer ${token}`;

    await request(app).get(configRoute)
        .set('authorization', authorization)
        .expect(401);
});