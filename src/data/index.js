'use strict';
const users = require('./users');

class Data {
  constructor() {
    this.users = users;
  }
}

module.exports = Data;

