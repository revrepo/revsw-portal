
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
var Contants = require('./../../../page_objects/constants.js');

describe('Smoke', function () {

  var userCustom;
  var currentPlan = 'Gold';
  var billingPortal = /www\.billingportal\.com/;
  var selfRegistration = function(done, user) {

    Portal
      .signUpAndVerifyUser(currentPlan)
      .then(function (newUser) {

        if (!user) {
          userCustom = newUser;
        } else {
          user();
        }

        return Portal.helpers.nav.goToBillingStatements();

      })
      .then(function () {
        done();
      });

  };

  var users = [
    'self registration',
    config.get('portal.users.revAdmin')
  ];

  users.forEach(function(user) {



  describe('With user: ' + (typeof user !== 'object' ? 'Admin' : user.role), function () {

    describe('Billing Statements', function () {

      beforeAll(function (done) {

        if (typeof user !== 'object') {
          selfRegistration(done);
        } else {
          selfRegistration(done, function() {
            Portal.signIn(user);
          });
        }


      });

      afterAll(function () {
        Portal.signOut();
      });

      beforeEach(function () {});


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

      if (typeof user === 'object') {

        it('should `View Details` button be disabled.',
          function () {
            var summary = Portal.accounts.billingStatements.summary;
            summary.setAccountSelect(Contants.selectedItems.billing.SELECTED_API_QA_ACCOUNT);

            summary.getViewDetailsBtn().getAttribute('disabled').then(function (isDisabled) {
                expect(isDisabled).toBe('true');
            });

          });


        it('should `View Details` button be enabled.',
          function () {
            var summary = Portal.accounts.billingStatements.summary;
            summary.setAccountSelect(userCustom.firstName + ' ' + userCustom.lastName);
            summary.getViewDetailsBtn().getAttribute('disabled').then(function (isDisabled) {
                expect(isDisabled).toBe(null);
            });

          });


        it('should `Update Payment Profile` button be disabled.',
          function () {

            var summary = Portal.accounts.billingStatements.summary;
            summary.setAccountSelect(Contants.selectedItems.billing.SELECTED_API_QA_ACCOUNT);
            summary.getUpdatePaymentProfileBtn()
              .getAttribute('disabled').then(function (isDisabled) {
                  expect(isDisabled).toBe('true');
            });

          });


        it('should `Update Payment Profile` button be enabled.',
          function () {

            var summary = Portal.accounts.billingStatements.summary;         
            summary.setAccountSelect(userCustom.firstName + ' ' + userCustom.lastName);
            summary.getUpdatePaymentProfileBtn()
              .getAttribute('disabled').then(function (isDisabled) {
                expect(isDisabled).toBe(null);
            });

          });

      }

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
    });

  });
});