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

var MailinatorHelper = require('./../../../mailinator/helper');

describe('Functional', function () {

  describe('Sign Up user', function () {

    beforeAll(function () {
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.load();
    });

    afterEach(function () {
    });

    it('should send verification token after success sign up.',
      function () {
        Portal
          .signUpUser()
          .then(function (user) {
            return MailinatorHelper
              .getVerificationTokenUrl(user.email)
              .then(function (verificationUrl) {
                expect(verificationUrl).not.toBeUndefined();
              });
          });
      });

    it('should sign in user after success verification.',
      function () {
        Portal
          .signUpAndVerifyUser()
          .then(function () {
            expect(Portal.header.getUserInfoEl().isDisplayed()).toBeTruthy();
          });
      });
  });
});
