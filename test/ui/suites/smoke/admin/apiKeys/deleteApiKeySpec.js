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

  describe('Delete API Key', function () {
    var apiKey = DataProvider.generateApiKeyData('API-Key-Delete');
    beforeEach(function () {
      Portal.signIn(userAdmin);

      Portal.createApiKey(apiKey);
      Portal.helpers.nav.goToAPIKeys();
    });

    afterEach(function () {
      Portal.signOut();
    });

    it('should display delete API Key button', function (done) {
      var deleteButton = Portal.admin.apiKeys.listPage.table
        .getFirstRow()
        .getDeleteBtn();
      expect(deleteButton.isDisplayed()).toBeTruthy();
      Portal.admin.apiKeys.listPage.searchAndClickDelete(apiKey.name);
      Portal.dialog.clickOk().then(function () {
        done();
      });
    });

    it('should delete an API Key with admin user', function () {
      Portal.admin.apiKeys.listPage.searchAndClickDelete(apiKey.name);
      Portal.dialog.clickOk();
      Portal.admin.apiKeys.listPage.searcher.setSearchCriteria(apiKey.name);

      var tableRows = Portal.admin.apiKeys.listPage.table.getRows();
      expect(tableRows.count()).toEqual(0);
    });

    it('should delete an API Key with RevAdmin user', function () {
      var isAdminUser = true;
      var account = 'API QA Reseller Company';
      Portal.admin.apiKeys.listPage.searchAndClickDelete(apiKey.name);
      Portal.dialog.clickOk();
      Portal.admin.apiKeys.listPage.searcher.setSearchCriteria(apiKey.name);

      var tableRows = Portal.admin.apiKeys.listPage.table.getRows();
    });

    it('should display confirmation dialog when deleting API Key', function () {
      Portal.admin.apiKeys.listPage.searcher.setSearchCriteria(apiKey.name);
      Portal.admin.apiKeys.listPage.table.getFirstRow().clickDelete();
      expect(Portal.dialog.isDisplayed()).toBeTruthy();
      Portal.dialog.clickOk();
    });

    it('should not be able to use API key after deleting it', function (done) {
      var isAdminUser = true;
      var account = 'API QA Reseller Company';
      Portal.admin.apiKeys.listPage.searchAndGetFirstRow(apiKey.name);
      var keycode;
      Portal.admin.apiKeys.listPage.table.getFirstRow().getAPICode().then(function (code) {
        keycode = code;
      });
      Portal.admin.apiKeys.listPage.searchAndClickDelete(apiKey.name);
      Portal.dialog.clickOk();
      Portal.apiKeysHelpers.validateAPIKey(keycode, function (res) {
        expect(res).toBe(401);
        done();
      });
    });
  });
});