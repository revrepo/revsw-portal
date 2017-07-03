var config = require('config');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var JasmineSpecReporter = require('jasmine-spec-reporter');

exports.config = {
  directConnect: false,
  seleniumAddress: config.get('protractor.seleniumAddress'),
  capabilities: {
    browserName: 'firefox'
  },
  getPageTimeout: 120000,
  allScriptsTimeout: 360000,
  framework: 'jasmine2',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 420000,
    showColors: true,
    print: function() {} // Disable default reporter
  },

  // inclusion of the istanbul plugin. will fail and log any coverage collection failures
  plugins : [{
    package: 'protractor-istanbul-plugin',
    logAssertions: true,
    failAssertions: true
  }],

  specs: [
    '../suites/**/*.js'
  ],

  // change the browser if desired
  capabilities: {
    'browserName': 'firefox'
  },

  // webdriver does not play nice with older protractors if this is not set
  directConnect: true,

  baseUrl: 'http://localhost:8000/',
};