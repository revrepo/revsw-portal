var smoke = require('./base');

smoke.capabilities = {
  browserName: 'firefox'
};

smoke.specs = [
  '../suites/smoke/azure/**/*.js',
  '../suites/functional/azure/**/*.js',
  '../suites/functional/2FA/**/*.js',
  '../suites/smoke/analytics/imageOptimizationSpec.js'
];

exports.config = smoke;