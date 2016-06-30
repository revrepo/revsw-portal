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
var Constants = require('./../../../page_objects/constants');

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
          return Portal.goToBillingStatements();
        })
        .then(function () {
          done();
        });
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      //Portal.goToBillingStatements();
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

    it('should `View Details` button open BillingPortal in new tab.',
      function () {
        Portal.accounts.billingStatements.summary
          .clickViewDetails()
          .then(function () {
            Portal.waitForNumberOfWindowsToEqual(2);
            browser.getAllWindowHandles().then(function (handles) {
              var oldWindowHandle = handles[0]; // this is the new window
              var newWindowHandle = handles[1]; // this is the new window
              browser.switchTo().window(newWindowHandle).then(function () {
                expect(browser.driver.getCurrentUrl()).toMatch(billingPortal);
                browser.driver.close();
                browser.driver.switchTo().window(oldWindowHandle);
              });
            });
          });
      });

    it('should `Update Payment Profile` open BillingPortal in new tab.',
      function () {
        Portal.accounts.billingStatements.summary
          .clickUpdatePaymentProfile()
          .then(function () {
            Portal.waitForNumberOfWindowsToEqual(2);
            browser.getAllWindowHandles().then(function (handles) {
              var oldWindowHandle = handles[0]; // this is the parent window
              var newWindowHandle = handles[1]; // this is the new window
              browser.switchTo().window(newWindowHandle).then(function () {
                expect(browser.driver.getCurrentUrl()).toMatch(billingPortal);
                browser.driver.close();
                browser.driver.switchTo().window(oldWindowHandle);
              });
            });
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
