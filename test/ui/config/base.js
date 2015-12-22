var config = require('config');
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

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
    isVerbose: true
  },
  onPrepare: function () {
    browser.manage().window().setSize(1024, 768);

    jasmine.getEnv().addReporter(
      new Jasmine2HtmlReporter({
        savePath: './results/tests/',
        takeScreenshots: true,
        takeScreenshotsOnlyOnFailures: true,
        consolidate: true,
        consolidateAll: true
      })
    );
  }
};
