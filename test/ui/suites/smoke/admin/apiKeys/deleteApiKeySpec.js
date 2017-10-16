/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2016] Rev Software, Inc.
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Rev Software, Inc. and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Rev Software, Inc.
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Rev Software, Inc.
 */

var config = require('config');
var Portal = require('./../../../../page_objects/portal');
var DataProvider = require('./../../../../common/providers/data');
var request = require('supertest');
describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var userAdmin = config.get('portal.users.admin');
  var userRevAdmin = config.get('portal.users.revAdmin');
  var userReseller = config.get('portal.users.reseller');

  describe('Delete API Key', function () {

    beforeAll(function () {
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it('should display delete API Key button', function () {
      Portal.signIn(userAdmin);
      Portal.helpers.nav.goToAPIKeys();
      var deleteButton = Portal.admin.apiKeys.listPage.table
        .getFirstRow()
        .getDeleteBtn();
      expect(deleteButton.isDisplayed()).toBeTruthy();
      Portal.signOut();
    });

    it('should delete an API Key with admin user', function () {
      var apiKey = DataProvider.generateApiKeyData('API-Key-Delete');
      Portal.signIn(userAdmin);
      Portal.createApiKey(apiKey);
      Portal.helpers.nav.goToAPIKeys();
      Portal.admin.apiKeys.listPage.searchAndClickDelete(apiKey.name);
      Portal.dialog.clickOk();
      Portal.admin.apiKeys.listPage.searcher.setSearchCriteria(apiKey.name);

      var tableRows = Portal.admin.apiKeys.listPage.table.getRows();
      expect(tableRows.count()).toEqual(0);
      Portal.signOut();
    });

    it('should delete an API Key with RevAdmin user', function () {
      var apiKey = DataProvider.generateApiKeyData('API-Key-Delete');
      Portal.signIn(userRevAdmin);
      var isAdminUser = true;
      var account = 'API QA Reseller Company';
      Portal.createApiKey(apiKey, isAdminUser, account);

      Portal.helpers.nav.goToAPIKeys();
      Portal.admin.apiKeys.listPage.searchAndClickDelete(apiKey.name);
      Portal.dialog.clickOk();
      Portal.admin.apiKeys.listPage.searcher.setSearchCriteria(apiKey.name);

      var tableRows = Portal.admin.apiKeys.listPage.table.getRows();
      expect(tableRows.count()).toEqual(0);
      Portal.signOut();
    });

    it('should display confirmation dialog when deleting API Key', function () {
      var apiKey = DataProvider.generateApiKeyData('API-Key-Delete');
      Portal.signIn(userAdmin);
      Portal.createApiKey(apiKey);

      Portal.helpers.nav.goToAPIKeys();
      Portal.admin.apiKeys.listPage.searcher.setSearchCriteria(apiKey.name);
      Portal.admin.apiKeys.listPage.table.getFirstRow().clickDelete();
      expect(Portal.dialog.isDisplayed()).toBeTruthy();
      Portal.dialog.clickOk();
      Portal.signOut();
    });

    it('should not be able to use API key after deleting it', function (done) {
      var apiKey = DataProvider.generateApiKeyData('API-Key-Delete');
      Portal.signIn(userRevAdmin);
      var isAdminUser = true;
      var account = 'API QA Reseller Company';
      Portal.createApiKey(apiKey, isAdminUser, account);

      Portal.helpers.nav.goToAPIKeys();
      Portal.admin.apiKeys.listPage.searchAndGetFirstRow(apiKey.name);
      var keycode;
      Portal.admin.apiKeys.listPage.table.getFirstRow().getAPICode().then(function (code) {
        keycode = code;
      });
      Portal.admin.apiKeys.listPage.searchAndClickDelete(apiKey.name).then(function () {
        Portal.dialog.clickOk();
        Portal.apiKeysHelpers.validateAPIKey(keycode, function (res) {
          expect(res).toBe(401);
          done();
        });
      });
    });
  });
});