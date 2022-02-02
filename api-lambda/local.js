const app = require('./src/app');
const port = process.env.PORT || 8080;

// Server
const server = app.listen(port, () => {
    console.log(`Listening on: http://localhost:${port}`);
});

module.exports = server;