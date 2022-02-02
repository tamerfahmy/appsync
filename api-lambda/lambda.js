'use strict'
//This file is AWS Lambda entry point

//const awsServerlessExpress = require('aws-serverless-express');
//const server = awsServerlessExpress.createServer(app);

const serverless = require('serverless-http');
const app = require('./src/app.js');

module.exports.handler = serverless(app);