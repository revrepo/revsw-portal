/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2017] Rev Software, Inc.
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
var Constants = require('./../../../../page_objects/constants');

describe('Boundary', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.admin'),
    config.get('portal.users.revAdmin'),
    config.get('portal.users.reseller')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Edit API Keys', function () {

        var apiKeyData = DataProvider.generateApiKeyData();
        var EditPage = Portal.admin.apiKeys.editPage;
        var account = 'API QA Reseller Company';
        var isUserAdmin = true;
        var form = EditPage.form;
        var checkDisplay = function (elem) {
          return EditPage.elementIsDisplayed(elem);
        };

        beforeAll(function () {
          Portal.signIn(user);
          Portal.createApiKey(apiKeyData, isUserAdmin, account);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToAPIKeys();
        });

        afterEach(function () {});

        it('should edit an API Key and Update its Name', function () {
          Portal.admin.apiKeys.listPage.searchAndClickEdit(apiKeyData.name);
          apiKeyData.name = apiKeyData.name + '_NEW';
          Portal.admin.apiKeys.editPage.updateKey(apiKeyData);
          Portal.admin.apiKeys.editPage.clickBackToList();
          Portal.admin.apiKeys.listPage.searcher.clearSearchCriteria();
          Portal.admin.apiKeys.listPage.searcher.setSearchCriteria(apiKeyData.name);
          var allRows = Portal.admin.apiKeys.listPage.table.getRows();
          expect(allRows.count()).toEqual(1);
        });

        it('should not update API Key name with 30 characters max', function () {
          Portal.admin.apiKeys.listPage.searchAndClickEdit(apiKeyData.name);
          var apiKeyName = apiKeyData.name;
          apiKeyData.name = apiKeyData.name + '_LONG_CHARACTERS';
          Portal.admin.apiKeys.editPage.updateKey(apiKeyData);
          Portal.admin.apiKeys.editPage.clickBackToList();

          Portal.admin.apiKeys.listPage.searcher.clearSearchCriteria();
          Portal.admin.apiKeys.listPage.searcher.setSearchCriteria(apiKeyData.name);
          var allRows = Portal.admin.apiKeys.listPage.table.getRows();
          expect(allRows.count()).toEqual(0);
          apiKeyData.name = apiKeyName;
        });  
      });
    });
  });
});