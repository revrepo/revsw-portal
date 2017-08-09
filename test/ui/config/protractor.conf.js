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
  plugins : [{
    package: 'protractor-istanbul-plugin',
    logAssertions: true,
    failAssertions: true
  }],
  onPrepare: function () {
    browser.manage().window().setSize(1280, 1024);
    browser.manage().window().setPosition(0, 0);
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

    var alertTimeout = function() {
        angular
            .module('alertTimeout', ['revapm.Portal.Config'])
            .run(function($config){
              // NOTE: fix for tests with checking allerts messages
              // Up time show toaster messages
              $config.SUCCESS_MESSAGE_DISPLAY_TIMEOUT = 50000;
            });
    };
    // NOTE: open browser on full screen
    setTimeout(function() {
        browser.driver.executeScript(function() {
            return {
                width: window.screen.availWidth,
                height: window.screen.availHeight
            };
        })
        .then(function(result) {
            browser.driver.manage().window().setSize(result.width, result.height);
        });
    });
    browser.addMockModule('disableNgAnimate', disableNgAnimate);
    browser.addMockModule('disableCssAnimate', disableCssAnimate);
    browser.addMockModule('alertTimeout', alertTimeout);
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
