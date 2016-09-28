var config = require('config');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var JasmineSpecReporter = require('jasmine-spec-reporter');

module.exports = {
  directConnect: false,
  seleniumAddress: config.get('protractor.seleniumAddress'),
  capabilities: {
    browserName: 'firefox'
  },
  getPageTimeout: 120000,
  allScriptsTimeout: 300000,
  framework: 'jasmine2',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 360000,
    showColors: true,
    print: function() {} // Disable default reporter
  },
  onPrepare: function () {
    browser.manage().window().setSize(1280, 1024);
    var disableNgAnimate = function() {
        angular
            .module('disableNgAnimate', [])
            .run(['$animate', function($animate) {
                $animate.enabled(false);
            }]);
    };

    var disableCssAnimate = function() {
        angular
            .module('disableCssAnimate', [])
            .run(function() {
                var style = document.createElement('style');
                style.type = 'text/css';
                style.innerHTML = '* {' +
                    '-webkit-transition: none !important;' +
                    '-moz-transition: none !important' +
                    '-o-transition: none !important' +
                    '-ms-transition: none !important' +
                    'transition: none !important' +
                    '}';
                document.getElementsByTagName('head')[0].appendChild(style);
            });
    };

    browser.addMockModule('disableNgAnimate', disableNgAnimate);
    browser.addMockModule('disableCssAnimate', disableCssAnimate);
    // add jasmine html reporter
    var htmlReporter = new Jasmine2HtmlReporter({
      savePath: './results/tests/',
      takeScreenshots: true,
      takeScreenshotsOnlyOnFailures: true,
      consolidate: true,
      consolidateAll: true
    });
    jasmine.getEnv().addReporter(htmlReporter);

    // add jasmine spec reporter
    var specReporter = new JasmineSpecReporter({
      displayStacktrace: 'summary'
    });
    jasmine.getEnv().addReporter(specReporter);
  }
};
