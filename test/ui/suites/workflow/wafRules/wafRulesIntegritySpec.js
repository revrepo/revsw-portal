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

describe('Workflow', function () {

  var user = config.get('portal.users.admin');

  describe('With user: ' + user.role, function () {
    /* api json is all camel_case */
    /* jshint camelcase:false */
    describe('WAF Rules Add Edit Integrity', function () {
      var customWAFRule = DataProvider.generateCustomWAFRule(user);
      var customWAFRuleUpdated = customWAFRule;
      var wafRule = {};
      beforeAll(function (done) {
        Portal.signIn(user);
        Portal.helpers.nav.goToWAFRules();
        Portal.wafRules.listPage.clickAddNewWAFRule();
        Portal.wafRules.addPage.createCustomWAFRule(customWAFRule).then(function () {
          Portal.helpers.wafRules.getWafRule(customWAFRule.ruleName).then(function (rule) {
            wafRule = rule;
            console.log(wafRule);
            done();
          });
        });
      });

      afterAll(function () {
        Portal.signOut();
      });

      beforeEach(function () {
        Portal.helpers.nav.goToWAFRules();
        Portal.wafRules.listPage.searchAndClickEditCustomerRule(customWAFRule.ruleName);
      });

      /* jshint ignore:start */
      String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
      };
      /* jshint ignore:end */

      it('should contain correct data in a newly created WAF Rule JSON object',
        function () {
          expect(wafRule.rule_name)
            .toBe(customWAFRule.ruleName);
          expect(wafRule.comment)
            .toBe(customWAFRule.comment[0]);
          expect(wafRule.rule_body)
            .toBe(customWAFRule.ruleBody.toString().replaceAll('', ''));
        });

      it('should display correct data in the WAF Rules UI elements',
        function () {
          Portal.wafRules.editPage.form.getWAFRuleName().then(function (name) {
            expect(name).toBe(wafRule.rule_name);
          });
          Portal.wafRules.editPage.form.getWAFRuleDescription().then(function (desc) {
            expect(desc).toBe(wafRule.comment);
          });
          Portal.wafRules.editPage.form.getWAFRuleStatements().then(function (statement) {
            expect(statement).toBe(wafRule.rule_body);
          });
        });

      it('should contain correct data in the WAF Rule object after update',
        function (done) {
          customWAFRuleUpdated.ruleName += ' UPDATED';
          customWAFRuleUpdated.comment[0] += ' UPDATED';
          customWAFRuleUpdated.ruleBody[0] += ' UPDATED';

          Portal.wafRules.editPage.form.fill(customWAFRuleUpdated);
          Portal.wafRules.editPage.clickUpdate();
          Portal.dialog.clickOk();
          Portal.alerts.waitToDisplay().then(function () {
            Portal
            .helpers
            .wafRules
            .getWafRule(customWAFRuleUpdated.ruleName).then(function (rule) {
              wafRule = rule;
              expect(wafRule.rule_name)
                .toBe(customWAFRuleUpdated.ruleName);
              expect(wafRule.rule_body.replaceAll(',', ''))
                .toBe(customWAFRuleUpdated.ruleBody.toString().replaceAll(',', ''));
              expect(wafRule.comment).toBe(customWAFRuleUpdated.comment[0]);
              done();
            });
          });
        });

      it('should display correct data in the WAF Rule UI elements after update',
        function () {
          Portal.wafRules.editPage.form.getWAFRuleName().then(function (name) {
            expect(name).toBe(wafRule.rule_name);
          });
          Portal.wafRules.editPage.form.getWAFRuleDescription().then(function (desc) {
            expect(desc).toBe(wafRule.comment);
          });
          Portal.wafRules.editPage.form.getWAFRuleStatements().then(function (statement) {
            expect(statement).toBe(wafRule.rule_body);
          });
        });
    });
  });
});
