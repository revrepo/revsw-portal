//
// Delete Subscriptions with state "Canceled"
//
var assert = require('assert');
var config = require('config');

var uiTimeoutMs = config.get('ui_timeout_ms');

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
      .assert.title('Sign In | Chargify')
      .assert.visible('@submit');
  });

  it('can find and fill credantionals ', function(client) {
    loginPage
      .setValue('@username', username)
      .setValue('@password', password)
      .assert.visible('@submit')
      .click('@submit')
      .waitForElementVisible('body', uiTimeoutMs)
      .assert.title('nuu:bit, Inc. | Your Sites');
  });

  it('must open dashboard page', function(client) {
    dashboardPage = client.page.chargify.dashboardPage();
    dashboardPage.navigate()
      .assert.title('nuubit-test: Dashboard | Chargify');
  });

  it('must show subscription list', function(client) {
    subscriptionsCanceledPage = client.page.chargify.subscriptionsCanceledPage();
    subscriptionsCanceledPage.navigate()
      .waitForElementVisible('body', uiTimeoutMs)
      .assert.title('nuubit-test: Subscriptions | Chargify');
  });

  it('must show subscription with state \'canceled\' and delete each Subscription', function(client) {

    var filteredAmount = 0;

    var i = 0;

    subscriptionsCanceledPage.navigate()
      .getText('@filteredAmount', function(result) {
        filteredAmount = result.value;
        filteredAmount =  filteredAmount - countNotDeletedRows;
        while (i < filteredAmount) {
          rows[i] = ++i;
          subscriptionsCanceledPage.navigate()
            .waitForElementVisible('body', uiTimeoutMs)
            .clickFirstCustomer()
            .waitForElementVisible('body', uiTimeoutMs);

          subscriptionSummaryPage
            .clickActionsDropdown()
            .section.actionsDropdown.clickDelete()
            .waitForElementVisible('body', uiTimeoutMs);

           subscriptionDeletePage
            .waitForElementVisible('body', uiTimeoutMs)
            .assert.title('nuubit-test: Delete Subscription | Chargify')
            .clickToSubmit()
            .waitForElementVisible('body', uiTimeoutMs);

        }
      });
  });
});
