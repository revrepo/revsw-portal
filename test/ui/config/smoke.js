var smoke = require('./base');

smoke.capabilities = {
  browserName: 'firefox',
  shardTestFiles: true,
  maxInstances: 3
};

smoke.specs = [
  '../suites/smoke/accounts/*Spec.js',
  '../suites/smoke/admin/**/*Spec.js',
  '../suites/smoke/analytics/*Spec.js',
  '../suites/smoke/dashboards/*Spec.js',
  '../suites/smoke/helpSupport/*Spec.js',
  '../suites/smoke/logShipping/*Spec.js',
  '../suites/smoke/mobileApps/*Spec.js',
  '../suites/smoke/stagingEnv/*Spec.js',
  '../suites/smoke/users/*Spec.js',
  '../suites/smoke/*Spec.js'
];

exports.config = smoke;