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
  var adminUser = config.get('portal.users.admin');
  var sellerUser = config.get('portal.users.reseller');
  // var revAdmin = config.get('portal.users.revAdmin');

  describe('Add API Key', function () {

    beforeAll(function () {
      // Portal.signIn(adminUser);
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      // Portal.helpers.nav.goToAPIKeys();
    });

    it('should create an API Key with "Admin" user', function () {
      Portal.signIn(adminUser);
      Portal.helpers.nav.goToAPIKeys();

      var defaultName = 'New API Key';
      var keyData = DataProvider.generateApiKeyData();

      Portal.admin.apiKeys.listPage.clickAddNewApiKey();
      Portal.admin.apiKeys.listPage.searcher.clearSearchCriteria();
      Portal.admin.apiKeys.listPage.searchAndClickEdit(defaultName);

      Portal.admin.apiKeys.editPage.form.setName(keyData.name);
      Portal.admin.apiKeys.editPage.form.clickUpdate();
      Portal.admin.apiKeys.editPage.clickBackToList();
      Portal.admin.apiKeys.listPage.searcher.clearSearchCriteria();
      Portal.admin.apiKeys.listPage.searcher.setSearchCriteria(keyData.name);

      var allRows = Portal.admin.apiKeys.listPage.table.getRows();
      expect(allRows.count()).toEqual(1);

      Portal.admin.apiKeys.listPage.searchAndClickDelete(keyData.name);
      Portal.dialog.clickOk();

      Portal.signOut();
    });

    it('should create an API Key with "Seller" user', function () {
      Portal.signIn(sellerUser);
      Portal.helpers.nav.goToAPIKeys();

      var defaultName = 'New API Key';
      var account = 'API QA Reseller Company';
      var keyData = DataProvider.generateApiKeyData();

      Portal.admin.apiKeys.listPage.clickAddNewApiKey();
      Portal.admin.apiKeys.addPage.createAccount(account);
      Portal.admin.apiKeys.listPage.searcher.clearSearchCriteria();
      Portal.admin.apiKeys.listPage.searchAndClickEdit(defaultName);

      Portal.admin.apiKeys.editPage.form.setName(keyData.name);
      Portal.admin.apiKeys.editPage.form.clickUpdate();
      Portal.admin.apiKeys.editPage.clickBackToList();
      Portal.admin.apiKeys.listPage.searcher.clearSearchCriteria();
      Portal.admin.apiKeys.listPage.searcher.setSearchCriteria(keyData.name);

      var allRows = Portal.admin.apiKeys.listPage.table.getRows();
      expect(allRows.count()).toEqual(1);

      Portal.admin.apiKeys.listPage.searchAndClickDelete(keyData.name);
      Portal.dialog.clickOk();

      Portal.signOut();
    });

    it('should use a newly created API key to fetch data from the API', function (done) {
      Portal.signIn(adminUser);
      Portal.helpers.nav.goToAPIKeys();

      var defaultName = 'New API Key';
      var keyData = DataProvider.generateApiKeyData();

      Portal.admin.apiKeys.listPage.clickAddNewApiKey();
      Portal.admin.apiKeys.listPage.searcher.clearSearchCriteria();
      Portal.admin.apiKeys.listPage.searchAndClickEdit(defaultName);

      Portal.admin.apiKeys.editPage.form.setName(keyData.name);
      Portal.admin.apiKeys.editPage.form.clickUpdate();
      Portal.admin.apiKeys.editPage.clickBackToList();
      Portal.admin.apiKeys.listPage.searcher.clearSearchCriteria();
      Portal.admin.apiKeys.listPage.searcher.setSearchCriteria(keyData.name);
      Portal.admin.apiKeys.listPage.table.getFirstRow().getAPICode().then(function (code) {
        var apiUrl = config.get('api.host.protocol') +
          '://' +
          config.get('api.host.name');
        request(apiUrl)
          .get('/v1/accounts')
          .set('Authorization', 'X-API-KEY ' + code)
          .expect(function (res) {
            expect(res.status).toEqual(200);
          })
          .expect(200, done);
      });
    });
  });
});