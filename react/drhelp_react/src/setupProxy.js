/**
 * Module dependencies.
 */
var http = require('http');
var connect = require('connect');
var proxy = require('../_proxy'); // require('http-proxy-middleware');

/**
 * Configure proxy middleware
 */
var jsonPlaceholderProxy = proxy({
  target: 'https://dr-help-backend.herokuapp.com',
  changeOrigin: true, // for vhosted sites, changes host header to match to target's host
  logLevel: 'debug'
});

var app = connect();

/**
 * Add the proxy to connect
 */
app.use('/users', jsonPlaceholderProxy);

http.createServer(app).listen(3000);

console.log('[DEMO] Server: listening on port 3000');
console.log('[DEMO] Opening: http://localhost:3000/users');

require('open')('http://localhost:3000/users');