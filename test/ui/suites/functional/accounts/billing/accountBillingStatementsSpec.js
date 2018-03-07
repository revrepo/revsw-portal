
/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2018] Rev Software, Inc.
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
var Contants = require('./../../../../page_objects/constants.js');

describe('Smoke', function () {

  var userCustom;
  var currentPlan = 'Gold';
  var billingPortal = /www\.billingportal\.com/;

  var users = [
    // Admin role (self-registration user)
    function (done, user) {
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
    },
    config.get('portal.users.revAdmin')
  ];

  users.forEach(function (user) {



    describe('With user: ' + (typeof user !== 'object' ? 'Admin' : user.role), function () {

      describe('Billing Statements', function () {

        beforeAll(function (done) {

          if (typeof user !== 'object') {
            // Admin role (self-registration user)
            user(done);
          } else {
            users[0](done, function () {
              //Portal.goToCustomUrl('#/');
              // Rev Admin role
              Portal.signIn(user);
            });
          }

        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () { });

        // Rev Admin role
        if (typeof user === 'object') {
          it('should select self-registration user',
            function () {
              var summary = Portal.accounts.billingStatements.summary;
              summary.setAccountSelect(userCustom.firstName + ' ' + userCustom.lastName);
              summary.getAccountSelectEl().getText().then(function (text) {
                expect(text).toBe(userCustom.firstName + ' ' + userCustom.lastName);
              });
            });
        }

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

      });
    });

  });
});
