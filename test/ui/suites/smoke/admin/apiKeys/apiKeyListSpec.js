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

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.revAdmin')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('API Key List', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToAPIKeys();
        });

        it('should display the Search input text in "API Keys List" page',
          function () {
            var displayed = Portal.admin.apiKeys.listPage.isDisplayed();
            expect(displayed).toBeTruthy();
          });

        it('should display the Title input text in "API Keys List" page',
          function () {
            var title = Portal.admin.apiKeys.listPage.getTitle();
            expect(title).toEqual('API Keys List');
          });

        it('should display "Add New API Key" button in "API Keys List" page',
          function () {
            var button = Portal.admin.apiKeys.listPage.getAddNewApiKeyBtn();
            expect(button.isDisplayed()).toBeTruthy();
          });

        it('should display the list of API Keys in "API Keys List" page',
          function () {
            Portal.admin.apiKeys.listPage.table.getFirstRow().clickEdit();
            Portal.admin.apiKeys.editPage.clickBackToList();
            var displayed = Portal.admin.apiKeys.listPage.isDisplayed();
            expect(displayed).toBeTruthy();
          });
      });
    });
  });
});