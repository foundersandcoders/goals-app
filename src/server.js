const Hapi = require('hapi');
const Inert = require('inert');
const fs = require('fs');
const path = require('path');
const socket = require('./sockets.js');
require('env2')('./config.env');

const server = new Hapi.Server();

server.connection({
  address: process.env.IP || '0.0.0.0',
  port: process.env.PORT || 4000,
  tls: process.env.NODE_ENV !== 'production' && {
    key : fs.readFileSync('./key.pem'),
    cert : fs.readFileSync('./cert.pem'),
  },
});

server.register([ Inert, ], (err) => {
  if(err) throw err;

  server.state('userCookie', {
    ttl: 360000,
    isSecure: true,
    isHttpOnly: false,
    encoding: 'base64json',
    clearInvalid: true,
    strictHeader: true,
  });

  server.route([{
    path: '/',
    method: 'GET',
    handler: (request, reply) => {
      const userCookie = request.state.userCookie || '';
      if(userCookie) {
        reply.file('public/index.html');
      } else {
        reply.redirect('/login');
      }
    },
  },
  {
    path: '/login',
    method: 'GET',
    handler: (request,reply) => { reply.file('public/login.html'); },
  },
  {
    path: '/{file*}',
    method: 'GET',
    handler: {
      directory: { path: path.join(__dirname, '../public'), },
    },
  },]);
});

socket(server.listener);

module.exports = server;
