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

  describe('Billing Statements', function () {

    beforeAll(function (done) {
      Portal
        .signUpAndVerifyUser(currentPlan)
        .then(function (newUser) {
          user = newUser;
          done();
        });
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.goToBillingStatements();
    });

    it('Should Check That Billing Summary exists.',
      function () {
        expect(Portal.accounts.billingStatements.summary
          .isDisplayed()).toBeTruthy();
      });

    xit('Should Check That Transactions exists.',
      function () {
        expect(Portal.accounts.billingStatements.transactions
          .isDisplayed()).toBeTruthy();
      });

    xit('Should Check That Statements exists.',
      function () {
        expect(Portal.accounts.billingStatements.statements
          .isDisplayed()).toBeTruthy();
      });

    xit('Should Check That Billing Summary displays report values.',
      function () {
      });

    xit('Should Check That Transactions displays report values.',
      function () {
      });

    xit('Should Check That Statements displays report values.',
      function () {
      });
  });
});
