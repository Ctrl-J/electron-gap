'use strict';
const auth = require('./auth');

class Logic {
  constructor() {
    this.auth = auth;
  }
}

module.exports = Logic;
