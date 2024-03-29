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
  var users = [
    config.get('portal.users.admin'),
    // config.get('portal.users.revAdmin'),
    // config.get('portal.users.reseller')
  ];

  var keyData = DataProvider.generateApiKeyData();

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('API Key Search', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToAPIKeys();
        });

        afterEach(function () {
        });

        it('should display Search text field in the API Key List page',
          function () {
            var searchField = Portal.admin.apiKeys.listPage.searcher
              .getSearchCriteriaTxtIn();
            expect(searchField.isPresent()).toBeTruthy();
          });

        it('should filter API Key according to criteria filled in Search field',
          function () {
            Portal.createApiKey(keyData);
            Portal.helpers.nav.goToAPIKeys();
            Portal.admin.apiKeys.listPage.searcher.clearSearchCriteria();
            Portal.admin.apiKeys.listPage.searcher
              .setSearchCriteria(keyData.name);
            var allRows = Portal.admin.apiKeys.listPage.table.getRows();
            expect(allRows.count()).toEqual(1);
          });
      });
    });
  });
});