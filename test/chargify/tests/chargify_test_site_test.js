// 
// Delete Subscriptions with state "Canceled"
// 
var assert = require('assert');
var config = require('config');

describe('Chargify  site ', function() {
  var loginPage, dashboardPage, subscriptionsCanceledPage, subscriptionSummaryPage, subscriptionDeletePage;
  var rows = [];
  var username = config.get('username');
  var password = config.get('password');
  var countNotDeletedRows = config.get('count_not_deleted_rows');
  
  before(function(client, done) {
    loginPage = client.page.chargify.loginPage();
    subscriptionSummaryPage = client.page.chargify.subscriptionSummaryPage();
    subscriptionDeletePage = client.page.chargify.subscriptionDeletePage();
    done();
  });

  afterEach(function(client, done) {
    done();
  });

  after(function(client, done) {
    client.end(function() {
      done();
    });
  });

  it('open login page', function(client) {
    loginPage.navigate()
      .assert.title('(Chargify) | Sign In')
      .assert.visible('@submit');
  });

  it('can find and fill credantionals ', function(client) {
    loginPage
      .setValue('@username', username)
      .setValue('@password', password)
      .assert.visible('@submit')
      .click('@submit')
      .waitForElementVisible('body', 3000)
      .assert.title('(Chargify) Rev Software, Inc. | Your Sites');
  });

  it('must open dashboard page', function(client) {
    dashboardPage = client.page.chargify.dashboardPage();
    dashboardPage.navigate()
      .assert.title('(Chargify) Rev Software, Inc. ~ RevAPM Test | Show Dashboard');
  });

  it('must show subscription list', function(client) {
    subscriptionsCanceledPage = client.page.chargify.subscriptionsCanceledPage();
    subscriptionsCanceledPage.navigate()
      .waitForElementVisible('body', 3000)
      .assert.title('(Chargify) Rev Software, Inc. ~ RevAPM Test | Subscriptions');
  });

  it('must show subscription with state \'canceled\' and delete each Subscription', function(client) {

    var filteredAmount = 0;

    var i = 0;
    console.log();
    subscriptionsCanceledPage.navigate()
      .getText('@filteredAmount', function(result) {
        filteredAmount = result.value;
        filteredAmount =  filteredAmount - countNotDeletedRows; 
        while (i < filteredAmount) {
          rows[i] = ++i;
          subscriptionsCanceledPage.navigate()
            .waitForElementVisible('body', 3000)
            .clickFirstCustomer()
            .waitForElementVisible('body', 3000);

          subscriptionSummaryPage
            .clickActionsDropdown()
            .section.actionsDropdown.clickDelete()
            .waitForElementVisible('body', 3000);
 
           subscriptionDeletePage
            .waitForElementVisible('body', 3000)
            .assert.title('(Chargify) Rev Software, Inc. ~ RevAPM Test | Delete Subscription')
            .clickToSubmit()
            .waitForElementVisible('body', 3000);

        }
      });
  });
});
