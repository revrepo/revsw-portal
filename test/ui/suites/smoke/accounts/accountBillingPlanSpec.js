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

  describe('Billing Plan', function () {

    beforeAll(function (done) {
      Portal
        .signUpAndVerifyUser(currentPlan)
        .then(function (newUser) {
          user = newUser;
          done();
        });
    });

    afterAll(function () {
    });

    beforeEach(function () {
      Portal.goToChangeBillingPlan();
    });

    it('should be displayed.',
      function () {
        expect(Portal.accounts.billingPlanPage
          .getTitleLbl()
          .isDisplayed()).toBeTruthy();
      });

    [
      'Developer',
      'Bronze',
      'Silver',
      'Gold'
    ].forEach(function (plan) {
        it('should display `' + plan + '` plan.',
          function () {
            expect(Portal.accounts.billingPlanPage
              .getPlanEl(plan)
              .getTitleEl()
              .isDisplayed()).toBeTruthy();
          });
      });

    it('should display current plan.',
      function () {
        expect(Portal.accounts.billingPlanPage
          .getPlanEl(currentPlan)
          .getTitleEl()
          .isDisplayed()).toBeTruthy();
      });

    it('should display dialog to confirm plan change.',
      function () {
        Portal.accounts.billingPlanPage
          .getPlanEl('Developer')
          .clickSubscribe();
        expect(Portal.dialog.getModalEl().isDisplayed()).toBeTruthy();
        Portal.dialog.clickCancel();
      });

    it('should allow to cancel plan change.',
      function () {
        Portal.accounts.billingPlanPage
          .getPlanEl('Developer')
          .clickSubscribe();
        Portal.dialog.clickCancel();
        expect(Portal.accounts.billingPlanPage
          .getTitleLbl()
          .isDisplayed()).toBeTruthy();
      });
  });
});
