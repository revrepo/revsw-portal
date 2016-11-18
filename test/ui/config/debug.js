var smoke = require('./base');

smoke.capabilities = {
  browserName: 'firefox',
  shardTestFiles: true,
  maxInstances: 1
};

smoke.specs = [
  '../suites/smoke/sslNames/addSSLNameSpec.js'
];

exports.config = smoke;