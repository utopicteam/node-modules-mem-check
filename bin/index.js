#!/usr/bin/env node --expose-gc

console.log('starting...')

const memCheck = require('../memCheck');
memCheck();