var smoke = require('./base');

smoke.capabilities = {
  browserName: 'firefox'
};

smoke.specs = [
  '../suites/smoke/*Spec.js',
  '../suites/smoke/**/*Spec.js'
];

exports.config = smoke;