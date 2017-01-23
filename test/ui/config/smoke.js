var smoke = require('./base');

smoke.capabilities = {
  browserName: 'chrome'
};

smoke.specs = [
  '../suites/smoke/*Spec.js',
  '../suites/smoke/**/*Spec.js'
];

exports.config = smoke;