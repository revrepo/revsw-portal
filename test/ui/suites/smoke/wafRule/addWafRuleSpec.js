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
var Portal = require('./../../../page_objects/portal');
var DataProvider = require('./../../../common/providers/data');

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.revAdmin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.admin')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {
      describe('Add WAF Rule', function () {

        beforeAll(function () {
        });

        afterAll(function () {
        });

        beforeEach(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToWAFRules();
          Portal.wafRules.listPage.clickAddNewWAFRule();
        });

        afterEach(function () {
          Portal.signOut();
        });

        it('should display "Add WAF Rule" form', function () {
          expect(Portal.wafRules.addPage.isDisplayed()).toBeTruthy();
          expect(Portal.wafRules.addPage.form.isDisplayed()).toBeTruthy();
        });

        it('should allow to cancel a WAF Rule addition', function () {
          Portal.wafRules.addPage.form.setWAFRuleName('something');
          Portal.wafRules.addPage.clickCancel();
          expect(Portal.wafRules.listPage.isDisplayed()).toBeTruthy();
        });

        it('should clear form after Cancel is clicked', function () {
          Portal.wafRules.addPage.form.setWAFRuleName('something');
          Portal.wafRules.addPage.clickCancel();
          Portal.wafRules.listPage.clickAddNewWAFRule();
          expect(Portal.wafRules.addPage.form.getWAFRuleName()).toEqual('');
        });
      });
    });
  });
});
