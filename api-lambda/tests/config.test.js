const request = require('supertest');
const app = require('../src/app');
const jwt = require('jsonwebtoken');

const configRoute = '/api/config';

it('should return 200 and the config object when valid token is passed', async () => {
    // set the APPSYNC_URL variable to a test value
    process.env.APPSYNC_URL = 'test URL';
    process.env.AppInfo = 'https://adidas.okta.com';
    process.env.Audience = 'sample audience';

    const token = jwt.sign({ exp: Date.now(), iss: 'https://adidas.okta.com', aud: 'sample audience' }, 'some key');
    const authorization = `Bearer ${token}`;

    const res = await request(app).get(configRoute)
        .set('authorization', authorization)
        .expect(200);

    expect(res.body).toEqual({ appsyncURL: 'test URL' });
});