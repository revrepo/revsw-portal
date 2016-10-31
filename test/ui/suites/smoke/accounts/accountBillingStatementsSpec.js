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

describe('Smoke', function () {

  var user;
  var currentPlan = 'Gold';
  var billingPortal = /www\.billingportal\.com/;

  describe('Billing Statements', function () {

    beforeAll(function (done) {
      Portal
        .signUpAndVerifyUser(currentPlan)
        .then(function (newUser) {
          user = newUser;
          return Portal.helpers.nav.goToBillingStatements();
        })
        .then(function () {
          done();
        });
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      //Portal.helpers.nav.goToBillingStatements();
    });

    it('should check that Billing Summary area exists.',
      function () {
        expect(Portal.accounts.billingStatements.summary
          .getCurrentBillingPlanEl()
          .isDisplayed()).toBeTruthy();
      });

    it('should check that Transactions area exists.',
      function () {
        expect(Portal.accounts.billingStatements.transactions
          .isDisplayed()).toBeTruthy();
      });

    it('should check that Statements area exists.',
      function () {
        expect(Portal.accounts.billingStatements.statements
          .isDisplayed()).toBeTruthy();
      });

    it('should `Change Billing Plan` button be displayed.',
      function () {
        expect(Portal.accounts.billingStatements.summary
          .getChangeBillingPlanBtn()
          .isDisplayed()).toBeTruthy();
      });

    it('should `View Details` button be displayed.',
      function () {
        expect(Portal.accounts.billingStatements.summary
          .getViewDetailsBtn()
          .isDisplayed()).toBeTruthy();
      });

    it('should `Update Payment Profile` button be displayed.',
      function () {
        expect(Portal.accounts.billingStatements.summary
          .getUpdatePaymentProfileBtn()
          .isDisplayed()).toBeTruthy();
      });

    it('should check that Billing Summary displays report values.',
      function () {
        Portal.accounts.billingStatements.summary
          .getCurrentBillingPlan()
          .then(function (currentValue) {
            expect(currentValue.length).toBeGreaterThan(0);
          });
      });

    it('should check that Transactions displays report values.',
      function () {
        Portal.accounts.billingStatements.transactions.table
          .getFirstRow()
          .getOperationType()
          .then(function (currentValue) {
            expect(currentValue.length).toBeGreaterThan(0);
          });
      });

    it('should check that Statements displays report values.',
      function () {
        Portal.accounts.billingStatements.statements.table
          .getFirstRow()
          .getStatement()
          .then(function (statementValue) {
            expect(statementValue.length).toBeGreaterThan(0);
          });
      });

    xit('should `View Details` button be disabled.',
      function () {
        // TODO: Bug? should it be disabled/enabled?
        browser.wait(function () {
          return Portal.accounts.billingStatements.summary
            .getViewDetailsBtn()
            .getAttribute('disabled')
            .then(function (isDisabled) {
              return isDisabled;
            });
        }, 10000);
        return Portal.accounts.billingStatements.summary
          .getViewDetailsBtn()
          .getAttribute('disabled')
          .then(function (isDisabled) {
            expect(isDisabled).not.toBe(false);
          });
      });

    xit('should `Update Payment Profile` button be disabled.',
      function () {
        // TODO: Bug? should it be disabled/enabled?
        browser.wait(function () {
          return Portal.accounts.billingStatements.summary
            .getUpdatePaymentProfileBtn()
            .getAttribute('disabled')
            .then(function (isDisabled) {
              return isDisabled;
            });
        }, 10000);
        return Portal.accounts.billingStatements.summary
          .getUpdatePaymentProfileBtn()
          .getAttribute('disabled')
          .then(function (isDisabled) {
            expect(isDisabled).not.toBe(false);
          });
      });

    it('should `Change Billing Plan` display billing plans page.',
      function () {
        Portal.accounts.billingStatements.summary
          .clickChangeBillingPlan()
          .then(function () {
            Portal.accounts.billingPlanPage
              .getTitle()
              .then(function (title) {
                expect(title).toBe('Manage Billing Plan');
              });
          });
      });
  });
})
;
