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

  var user/* = {
    email: 'sandy-1467776514362@mailinator.com',
    password: 'password1'
  }*/;
  var currentPlan = 'Gold';

  describe('Forgot Password', function () {

    beforeAll(function (done) {
      Portal
        .signUpAndVerifyUser(currentPlan)
        .then(function (newUser) {
          user = newUser;
          Portal.signOut();
          done();
        });
    });

    afterAll(function () {
    });

    it('should successfully send change-password request.',
      function () {
        Portal.loginPage.clickForgotPassword();
        Portal.dialog.setEmail(user.email);
        Portal.dialog.clickSubmit();
        expect(Portal.alerts
          .getFirst()
          .getText()).toEqual('An e-mail has been sent to ' + user.email +
          ' with further instructions');
      });
  });
});
