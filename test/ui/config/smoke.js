var smoke = require('./base');

smoke.capabilities = {
  browserName: 'firefox'
};

smoke.specs = [
  '../suites/smoke/azure/**/*Spec.js',
  '../suites/functional/azure/**/*Spec.js',
  '../suites/functional/users/**/*Spec.js'
];

exports.config = smoke;