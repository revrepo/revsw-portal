var smoke = require('./base');

smoke.capabilities = {
  browserName: 'firefox'
};

smoke.specs = [
  '../suites/workflow/sslCerts/addSSLCertSpec.js',
  '../suites/workflow/domains/domainListSpec.js',
  '../suites/functional/sideMenu/responsiveMenuSpec.js',
  '../suites/functional/sideMenu/menuToggleBtnSpec.js',
  '../suites/functional/companies/vendorChangeSpec.js',
  '../suites/functional/help/helpSpec.js',
  '../suites/functional/wafRules/wafRulesAccountLinkSpec.js',
  '../suites/functional/whiteLabel/signUpPageFooterSpec.js',
  '../suites/smoke/admin/accounts/editAccountSpec.js'
];

exports.config = smoke;