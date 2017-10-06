var smoke = require('./base');

smoke.specs = [
  '../suites/functional/users/resetPasswordSpec.js',
  '../suites/workflow/domains/domainListSpec.js',
  '../suites/workflow/sslCerts/addSSLCertSpec.js',
  '../suites/workflow/sslCerts/deleteSSLCertSpec.js'
];

exports.config = smoke;