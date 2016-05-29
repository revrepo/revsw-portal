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
      // Portal.signOut();
    });

    beforeEach(function () {
      // Portal.getApiKeysPage();
    });

    it('should create an API Key with "Admin" user', function () {
      Portal.signIn(adminUser);
      Portal.getApiKeysPage();

      var defaultName = 'New API Key';
      var data = DataProvider.generateApiKeyData();

      Portal.admin.apiKeys.listPage.clickAddNewApiKey();
      Portal.admin.apiKeys.listPage.searcher.clearSearchCriteria();
      Portal.admin.apiKeys.listPage.searchAndClickEdit(defaultName);

      Portal.admin.apiKeys.editPage.form.setName(data.name);
      Portal.admin.apiKeys.editPage.form.clickUpdate();
      Portal.admin.apiKeys.editPage.clickBackToList();
      Portal.admin.apiKeys.listPage.searcher.clearSearchCriteria();
      Portal.admin.apiKeys.listPage.searcher.setSearchCriteria(data.name);
      
      var allRows = Portal.admin.apiKeys.listPage.table.getRows();
      expect(allRows.count()).toEqual(1);

      Portal.admin.apiKeys.listPage.searchAndClickDelete(data.name);
      Portal.dialog.clickOk();

      Portal.signOut();
    });

    it('should create an API Key with "Seller" user', function () {
      Portal.signIn(sellerUser);
      Portal.getApiKeysPage();

      var defaultName = 'New API Key';
      var account = 'API QA Reseller Company';
      var data = DataProvider.generateApiKeyData();

      Portal.admin.apiKeys.listPage.clickAddNewApiKey();
      Portal.admin.apiKeys.addPage.createAccount(account);
      Portal.admin.apiKeys.listPage.searcher.clearSearchCriteria();
      Portal.admin.apiKeys.listPage.searchAndClickEdit(defaultName);

      Portal.admin.apiKeys.editPage.form.setName(data.name);
      Portal.admin.apiKeys.editPage.form.clickUpdate();
      Portal.admin.apiKeys.editPage.clickBackToList();
      Portal.admin.apiKeys.listPage.searcher.clearSearchCriteria();
      Portal.admin.apiKeys.listPage.searcher.setSearchCriteria(data.name);
      
      var allRows = Portal.admin.apiKeys.listPage.table.getRows();
      expect(allRows.count()).toEqual(1);

      Portal.admin.apiKeys.listPage.searchAndClickDelete(data.name);
      Portal.dialog.clickOk();

      Portal.signOut();
    });
  });
});