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
  //var users = [
    //config.get('portal.users.admin'),
    //config.get('portal.users.reseller'),
    //config.get('portal.users.revAdmin')
  //];

  //users.forEach(function (user) {

    //describe('With user: ' + user.role, function () {
      describe('Sign Up user', function () {

        beforeAll(function (done) {
          //Portal
          //  .signUpUser()
          //  .then(function (newUser) {
          //    console.log('USER', newUser);
          //    Portal
          //      .signOut()
          //      .then(function () {
          //        done();
          //      });
          //  });
        });

        afterAll(function () {
          // Portal.signOut();
        });

        beforeEach(function () {
          Portal.load();
        });

        afterEach(function () {
          // done
        });

        it('should display `Sign Up` button.',
          function () {
            expect(Portal.loginPage
              .getSignUpBtn()
              .isDisplayed()).toBeTruthy();
          });

        it('should display billing plans',
          function () {
            Portal.loginPage.clickSignUp();
            expect(Portal.signUp.plansPage
              .getPlanEl('Gold')
              .isDisplayed()).toBeTruthy();
          });

        it('should display `Sign Up` form after selecting a billing plan',
          function () {
            Portal.loginPage.clickSignUp();
            Portal.signUp.plansPage
              .getPlanEl('Gold')
              .clickSubscribe();
            expect(Portal.signUp.formPage.form
              .getSignUpBtn()
              .isDisplayed()).toBeTruthy();
          });

        it('should display `Cancel` button in `sign up` form',
          function () {
            Portal.loginPage.clickSignUp();
            Portal.signUp.plansPage
              .getPlanEl('Gold')
              .clickSubscribe();
            expect(Portal.signUp.formPage.form
              .getCancelBtn()
              .isDisplayed()).toBeTruthy();
          });

        it('should go back to `Billing Plans` view after clicking on ' +
          '`Cancel` button',
          function () {
            Portal.loginPage.clickSignUp();
            Portal.signUp.plansPage
              .getPlanEl('Gold')
              .clickSubscribe();
            Portal.signUp.formPage.form
              .clickCancel();
            expect(Portal.signUp.plansPage
              .getPlanEl('Gold')
              .isDisplayed()).toBeTruthy();
          });

        it('should go back to `Billing Plans` view after clicking on ' +
          '`Cancel` button',
          function () {
            var user = DataProvider.generateUserToSignUp();
            Portal.loginPage.clickSignUp();
            Portal.signUp.plansPage
              .getPlanEl('Gold')
              .clickSubscribe();
            Portal.signUp.formPage.form.fill(user);
            Portal.signUp.formPage.form.clickSignUp();
            expect(Portal.signUp.formPage.getSuccessMessage())
              .toEqual('Something');
          });
      });
    //});
  //});
});
