const express = require('express');
const cors = require('cors');
const { oktaAuth } = require('./okta-authenticator.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(oktaAuth);

if (process.env.NODE_ENV === 'development') {
    app.use(cors());
    console.log('Audience', process.env.Audience);
    console.log('APPSYNC_URL', process.env.APPSYNC_URL);
    console.log('Issuer', process.env.AppInfo);
}

app.get('/public/api/config/props', (req, res) => {
    res.status(200).send({ jwtAud: process.env.Audience });
});

app.get('/api/config', (req, res) => {
    const config = { appsyncURL: process.env.APPSYNC_URL };
    res.status(200).send(config);
});

module.exports = app;