// protra
// var conf = require('config');
module.exports.config = {
  seleniumAddress: "http://127.0.0.1:4444/wd/hub",
  baseURL: 'http://localhost:3000/',
  // specs: ['./suites/*.spec.js'],
  // framework: 'jasmine',
  getPageTimeout: 60000,
  allScriptsTimeout: 500000,
    // Spec patterns are relative to this directory.
  specs: [
    'features/*.feature'
  ],
  framework: 'custom',
  // path relative to the current config file
   frameworkPath: require.resolve('cucumber'),

  // frameworkPath: require.resolve('protractor-cucumber-framework'),
  capabilities: {
    'browserName': 'chrome'
  },
cucumberOpts: {
    require: 'features/step_definitions/test_step_definitions.js',
    tags: false,
    format: 'pretty',
    profile: false,
    'no-source': true
  }


}
