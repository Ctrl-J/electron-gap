'use strict';
const express = require('express');
const httpProxy = require('http-proxy');
const bodyParser = require('body-parser');
const requestModule = require('request');
const path = require('path');

class Web {
  constructor(config) {
    this.server = express();
    if ((config === 'undefined') || (config.web === 'undefined')) {
      console.error('Configuration not valid for web setup.');
    } else {
      this.config = config;
    }
  }

  initialize() {
    this.proxy = httpProxy.createProxyServer({
      target: `http://localhost:${this.config.api.port}`
    });

    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({
      extended: true
    }));

    this.server.get('/',
      (request, response) => {
        response.send('Hello, from the Web Server');
      }
    );

    this.server.post('/login',
      (request, response) => {
        requestModule.post(
          `http://localhost:${this.config.api.port}/login`,
          {
            form: {
              username: request.body.username,
              password: request.body.password
            }
          },
          (error, apiResponse, body) => {
            console.log(apiResponse);
            response.send(body);
          }
        );
      }
    );

    this.server.use('/api',
      (request, response) => {
        this.proxy.web(request, response);
      }
    );

    this.server.use(express.static(path.resolve(__dirname, 'static')));
  }

  start() {
    if (this.config === 'undefined') {
      console.error('Web server not configured. Server not running.');
      return;
    }

    const port = this.config.web.port;
    this.server.listen(port,
      () => {
        console.log(`Web server is listening on ${port}`);
      }
    );
  }
}

module.exports = Web;
