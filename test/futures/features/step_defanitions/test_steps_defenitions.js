this.Given(/^I go to "([^"]*)"$/, function(site, callback) {
    browser.get(site)
     .then(callback);
  });
