const PROXY_CONFIG = [
  {
   context: ['/api/*', '/dev/*'],
   target: 'http://localhost:8080',
   secure: false,
   logLevel: 'info'
 }
];
module.exports = PROXY_CONFIG;
