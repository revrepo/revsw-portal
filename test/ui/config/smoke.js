var smoke = require('./base');

smoke.specs = [
  '../suites/smoke/users/addUserSpec.js',
  '../suites/smoke/accounts/accountBillingStatementsSpec.js',
  '../suites/smoke/dnsZoneRecords/editZoneRecordSpec.js',
  '../suites/smoke/sslNames/addSSLNameSpec.js'
];

exports.config = smoke;