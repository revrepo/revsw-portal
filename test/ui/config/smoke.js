var smoke = require('./base');
smoke.specs = [
  //'../suites/negative/2fa/twoFactorAuthSetupSpec.js',
  //'../suites/negative/2fa/twoFactorAuthLoginSpec.js',
  //'../suites/negative/domains/editDomainSpec.js',
  '../suites/smoke/logShipping/addLogShippingSpec.js',
  '../suites/smoke/wafRule/addWafRuleSpec.js',
  '../suites/smoke/domains/addDomainSpec.js',
  '../suites/smoke/accounts/accountBillingStatementsSpec.js'
];

exports.config = smoke;