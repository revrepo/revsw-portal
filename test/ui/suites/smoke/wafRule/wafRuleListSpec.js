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
var Portal = require('./../../../page_objects/portal');

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.user'),
    config.get('portal.users.admin'),
    config.get('portal.users.revAdmin'),
    config.get('portal.users.reseller')
  ];


  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('WAF Rule list', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToWAFRules();
        });

        it('should be displayed when page open',
          function () {
            expect(Portal.wafRules.listPage.isDisplayed()).toBeTruthy();
          });

        it('should be displayed button with text "Add New WAF Rule"',
          function () {
            expect(Portal.wafRules.listPage.getAddNewWAFRuleBtn().isDisplayed()).toBeTruthy();
            expect(Portal.wafRules.listPage.getAddNewWAFRuleBtn().getText())
              .toContain('Add New WAF Rule');
          });

        it('should be displayed when "Back to list" button is clicked from ' +
          '"Add New WAF Rule" page',
          function () {
            Portal.wafRules.listPage.clickAddNewWAFRule();
            Portal.wafRules.addPage.clickBackToList();
            expect(Portal.wafRules.listPage.isDisplayed()).toBeTruthy();
          });
        if ((user.role === 'Rev Admin' || user.role === 'Reseller')) {
          it('should be displayed when "Back" button is clicked from ' +
            '"All Account Resources" page',
            function () {
              Portal
                .wafRules
                .listPage
                .tableCustomerRules
                .getFirstRow()
                .clickAccount();
              Portal.accountResourcesPage.clickBackButton();
              expect(Portal
                .wafRules
                .listPage
                .isDisplayed()).toBeTruthy();
            });
        }
      });
    });
  });
});
