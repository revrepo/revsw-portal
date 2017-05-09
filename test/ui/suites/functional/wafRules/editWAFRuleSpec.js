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
var Constants = require('./../../../page_objects/constants');
var DataProvider = require('./../../../common/providers/data');
var API = require('./../../../common/api').API;
describe('Functional', function () {
  describe('Edit WAF Rule', function () {

    var users = [
      config.get('portal.users.revAdmin'),
      config.get('portal.users.reseller'),
      config.get('portal.users.admin'),
      config.get('portal.users.user')
    ];

    users.forEach(function (user) {

      describe('With user: ' + user.role, function () {
        var WAFRule;
        beforeAll(function (done) {
          Portal.signIn(user);
          Portal.helpers.nav.goToWAFRules();
          // NOTE: Use API for create
          API.helpers.authenticateUser(user)
            .then(function () {
              return API.helpers.wafRules.createOneForAccount(user.account)
                .then(function (data) {
                  /* jshint ignore:start */
                  WAFRule = {
                    ruleName: data.rule_name
                  };
                  /* jshint ignore:end */
                  return;
                });
            })
            .then(function () {
              done();
            })
            .catch(done);
        });

        afterAll(function () {
          Portal.signOut();
        });

        it('should verify the WAF Rule successfully',
          function () {
            Portal.wafRules.listPage.searchAndClickEditCustomerRule(WAFRule.ruleName);
            expect(Portal.wafRules.editPage.isDisplayed()).toBeTruthy();
            Portal.wafRules.editPage.clickVerify();
            var alert = Portal.alerts.getFirst();
            expect(alert.getText()).toEqual('Successfully verified the WAF rule');
          });

      });
    });
  });
});
