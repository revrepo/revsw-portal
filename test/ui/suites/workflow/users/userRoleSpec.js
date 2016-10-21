/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2015] Rev Software, Inc.
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

describe('Workflow', function () {
  describe('User-role user', function () {

    var users = [
      config.get('portal.users.reseller')
    ];
    var adminUser = config.get('portal.users.admin');

    users.forEach(function (user) {

      describe('With user: ' + user.role, function () {

        it('should be able to sign-in once it is created by a reseller user',
          function (done) {
            Portal.session.setCurrentUser(user);
            Portal.helpers.users
              .create()
              .then(function (testUser) {
                // Check new user can sign in
                Portal.signIn(testUser);
                var userInfoEl = Portal.header.getUserInfoEl();
                expect(userInfoEl.isDisplayed()).toBeTruthy();
                Portal.signOut();
                done();
              })
              .catch(done);
          });

        it('should be able to sign-in once it is created by an admin user',
          function (done) {
            Portal.session.setCurrentUser(adminUser);
            Portal.helpers.users
              .create()
              .then(function (testUser) {
                // Check new user can sign in
                Portal.signIn(testUser);
                var userInfoEl = Portal.header.getUserInfoEl();
                expect(userInfoEl.isDisplayed()).toBeTruthy();
                Portal.signOut();
                done();
              })
              .catch(done);
          });

        it('should be able to sign-in after a successful password update',
          function (done) {
            Portal.session.setCurrentUser(adminUser);
            Portal.helpers.users
              .create()
              .then(function (testUser) {
                var newPwd = 'password3';
                // Sign in with new user and change password
                Portal.signIn(testUser);
                Portal.helpers.nav.goToUpdatePassword();
                Portal.updatePasswordPage.update(testUser.password, newPwd);
                Portal.signOut();
                // Sign-in using new password and validate
                Portal.signIn({email: testUser.email, password: newPwd});
                var userInfoEl = Portal.header.getUserInfoEl();
                expect(userInfoEl.isDisplayed()).toBeTruthy();
                Portal.signOut();
                done();
              })
              .catch(done);
          });
      });
    });
  });
});
