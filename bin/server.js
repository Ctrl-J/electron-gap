#!/usr/bin/env node
const Api = require('../api');
const Web = require('../web');
const config = require('../config');

const api = new Api(config);
api.initialize();
api.start();

const web = new Web(config);
web.initialize();
web.start();
