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

describe('Smoke', function() {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.user'),
    config.get('portal.users.roUser'),
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.revAdmin')
  ];

  users.forEach(function(user) {

    describe('With user: ' + user.role, function() {

      describe('User security settings', function() {

        beforeAll(function() {
          Portal.signIn(user);
        });

        afterAll(function() {
          Portal.signOut();
        });

        beforeEach(function() {
          Portal.helpers.nav.goToSecuritySettings();
        });

        it('should display "Security Settings" by selecting option from ' +
          'sidebar',
          function() {
            expect(Portal.securitySettingsPage.isDisplayed()).toBeTruthy();
          });
        it('should display page title with text "Two-Factor Authentication"',
          function() {
            expect(Portal.securitySettingsPage.isDisplayed()).toBeTruthy();
            expect(Portal.securitySettingsPage.getTitleLbl().getText())
              .toEqual('Two-Factor Authentication');

          });
        it('should display "Activation One-Time Password" form with buttons',
          function() {
            expect(Portal.securitySettingsPage.getSetUpTwoFactorAuthBtn().isDisplayed())
              .toBeTruthy();
            expect(Portal.securitySettingsPage.getSetUpTwoFactorAuthBtn().isEnabled())
              .toBeTruthy();

            Portal.securitySettingsPage.getSetUpTwoFactorAuthBtn().click();

            expect(Portal.securitySettingsPage.getCancelBtn().isDisplayed())
              .toBeTruthy();
            expect(Portal.securitySettingsPage.getEnableBtn().isDisplayed())
              .toBeTruthy();
          });
      });
    });
  });
});
