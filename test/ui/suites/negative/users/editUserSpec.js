/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2017] Rev Software, Inc.
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

describe('Negative', function () {
  describe('Edit user', function () {

    var users = [
      config.get('portal.users.admin'),
      config.get('portal.users.revAdmin'),
      config.get('portal.users.reseller')
    ];

    users.forEach(function (user) {
      var testUser;
      describe('With user: ' + user.role, function () {

        beforeAll(function (done) {
          Portal
            .signIn(user)
            .then(function () {
              Portal.helpers.users
                .create()
                .then(function (newUser) {
                  testUser = newUser;
                  done();
                })
                .catch(done);
            })
            .catch(done);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToUsers();
          Portal.userListPage.searchAndClickEdit(testUser.email);
        });

        it('should not allow to edit the user\'s email', function () {
          var emailField = Portal.editUserPage.form.getEmailTxtIn();
          expect(emailField.isEnabled()).toBeFalsy();
        });

        it('should not allow to update a user without "First Name"',
          function () {
            Portal.editUserPage.form.clearFirstName();
            var addBtn = Portal.editUserPage.getUpdateUserBtn();
            expect(addBtn.isEnabled()).toBeFalsy();
          });

        it('should not allow to update a user without "Last Name"',
          function () {
            Portal.editUserPage.form.clearLastName();
            var addBtn = Portal.editUserPage.getUpdateUserBtn();
            expect(addBtn.isEnabled()).toBeFalsy();
          });

        it('should not allow to update a user without role',
          function () {
            Portal.editUserPage.form.setRole('--- Select Role ---');
            var addBtn = Portal.editUserPage.getUpdateUserBtn();
            expect(addBtn.isEnabled()).toBeFalsy();
          });

        /* If we change role, the account input field resets. */
        if (user.role === 'Reseller' || user.role === 'Rev Admin') {
          it('should not allow to update a user without Account',
            function () {
              Portal.editUserPage.form.setRole('--- Select Role ---');
              Portal.editUserPage.form.setRole('user');
              Portal.editUserPage.form.setRole('admin');
              Portal.editUserPage.form.setRole('reseller');
              var addBtn = Portal.editUserPage.getUpdateUserBtn();
              expect(addBtn.isEnabled()).toBeFalsy();
            });
        }
      });
    });
  });
});
