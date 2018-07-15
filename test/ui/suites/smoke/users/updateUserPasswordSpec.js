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
var dataUsers = require('./../../../config/default');

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.revAdmin')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Update user password', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToUpdatePassword();
        });

        it('should display updated password form', function () {
          expect(Portal.updatePasswordPage.isDisplayed()).toBeTruthy();
        });

        it('should update password successfully', function () {

          var testPassword = 'test_password';
          var alertMessages = Constants.alertMessages.users.MSG_SUCCESS_UPDATE_PASSWORD;
          var alertFirst = Portal.alerts.getFirst();

          for (var key in dataUsers.portal.users) {
            if (dataUsers.portal.users[key].role === user.role) {
              var defaultPassword = dataUsers.portal.users[key].password;     
              Portal.updatePasswordPage.update(defaultPassword, testPassword);
              expect(alertFirst.getText()).toContain(alertMessages);
              Portal.updatePasswordPage.update(testPassword, defaultPassword);
            }          
          }


        });
      });
    });
  });
});
