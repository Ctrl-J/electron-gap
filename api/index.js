'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

class Api {
  constructor(config) {
    this.server = express();
    if ((config === 'undefined') || (config.api === 'undefined')) {
      console.error('Configuration not valid for api setup.');
    } else {
      this.config = config.api;
    }
  }

  initialize() {
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({
      extended: true
    }));

    this.server.use('/login/', routes.login);
  }

  start() {
    if (this.config === 'undefined') {
      console.error('API not configured. Server not running.');
      return;
    }

    const port = this.config.port;
    this.server.listen(port,
      () => {
        console.log(`API server is listening on ${port}`);
      }
    );
  }
}

module.exports = Api;
