var smoke = require('./base');

smoke.capabilities = {
  browserName: 'chrome',
  shardTestFiles: true,
  maxInstances: 1
};

smoke.specs = [
  // '../suites/smoke/dnsZones/dnsZonesList*.js',
  // '../suites/smoke/billing/usageReportSpec.js',
  // '../suites/negative/billing/usageReportSpec.js',
  // '../suites/functional/billing/usageReportSpec.js',
  //  '../suites/functional/billing/usageReportDomainsSpec.js'
  // '../suites/smoke/dnsAnalytics/*Spec.js'
  // fix bug
  // '../suites/smoke/accounts/accountProfileSpec.js'
  // '../suites/smoke/domains/editD*Spec.js'
  // '../suites/functional/domains/editD*Spec.js'
  '../suites/smoke/domains/tabGen*Spec.js'


];

exports.config = smoke;
