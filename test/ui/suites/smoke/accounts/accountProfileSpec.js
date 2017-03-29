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

  describe('Account Profile', function () {

    beforeAll(function (done) {
      Portal
        .signUpAndVerifyUser()
        .then(function () {
          done();
        });
    });

    afterAll(function () {
      Portal.signOut();
    });

    beforeEach(function () {
      Portal.helpers.nav.goToAccountProfile();
    });

    it('should be displayed.',
      function () {
        expect(Portal.accounts.profilePage
          .getTitleLbl()
          .isDisplayed()).toBeTruthy();
      });

    it('should leave account profile edition page after cancel.',
      function () {
        Portal.accounts.profilePage.form.clickCancel();
        expect(Portal.accounts.profilePage.isPresent()).toBeFalsy();
      });

    it('should update company profile.',
      function () {
        var updatedProfile = DataProvider.generateProfile();
        Portal.accounts.profilePage.form.fill(updatedProfile);
        Portal.accounts.profilePage.form.clickUpdate();
        Portal.dialog.clickOk();
        expect(Portal.alerts
          .getFirst()
          .getText()).toEqual('Successfully updated company profile');
      });

    it('should be able to cancel `delete company profile` process.',
      function () {
        Portal.accounts.profilePage
          .clickDeleteCompanyProfile()
          .then(function () {
            expect(Portal.dialog.getCancelBtn().isDisplayed()).toBeTruthy();
            Portal.dialog.clickCancel();
          });
      });
  });

});


