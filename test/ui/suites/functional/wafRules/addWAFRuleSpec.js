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
var DataProvider = require('./../../../common/providers/data');
var Constants = require('./../../../page_objects/constants');

// TODO: Nikolay please review and fix the test
xdescribe('Functional', function () {
  describe('Add WAF Rule', function () {

    var users = [
      config.get('portal.users.revAdmin'),
      config.get('portal.users.reseller'),
      config.get('portal.users.admin'),
      config.get('portal.users.user')
    ];

    users.forEach(function (user) {

      describe('With user: ' + user.role, function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        it('should display a successful message when creating ' +
          'Customer WAF Rule',
          function () {
            var customWAFRule = DataProvider.generateCustomWAFRule(user);
            Portal.helpers.nav.goToWAFRules();
            Portal.wafRules.listPage.clickAddNewWAFRule();
            Portal.wafRules.addPage.createCustomWAFRule(customWAFRule);
            var alert = Portal.alerts.getFirst();
            expect(alert.getText())
              .toContain(Constants.alertMessages.wafRules.MSG_SUCCESS_ADD);
          });

      });
    });
  });
});
