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
var API = require('./../../../common/api').API;

describe('Functional', function () {
  describe('Add user', function () {

    var users = [
      config.get('portal.users.admin'),
      config.get('portal.users.reseller'),
      config.get('portal.users.revAdmin')
    ];

    users.forEach(function (user) {

      describe('With user: ' + user.role, function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        var john;

        it('should display a successful message when creating ' +
          'user', function () {
            var bret = DataProvider.generateUser();
            if (user.role === 'Admin') {
              delete bret.role;
            } else {
              bret.company = [user.account.companyName];
            }
            Portal.helpers.nav.goToUsers();
            Portal.userListPage.clickAddNewUser();
            Portal.addUserPage.createUser(bret).then(function () {
              john = bret;
              var alert = Portal.alerts.getFirst();
              expect(alert.getText())
                .toContain(Constants.alertMessages.users.MSG_SUCCESS_ADD);
              Portal.addUserPage.clickBackToList();
            });
          });

        it('should be able to login with new user ', function (done) {
          Portal.signOut().then(function () {
            Portal.signIn(john);
            expect(Portal
              .loginPage
              .getEmailTxtIn()
              .isPresent()).toBeFalsy();
            Portal.signOut().then(function () {
              //log back into testing user              
              Portal.signIn(user);
              Portal.helpers.nav.goToUsers();
              done();
            });
          });
        });

        it('should create a new user with "admin" role', function (done) {
          Portal.helpers.users
            .create({
              firstName: 'Tom',
              role: Constants.user.roles.ADMIN
            })
            .then(function (tom) {
              Portal.userListPage.refresh();
              Portal.userListPage.searcher.setSearchCriteria(tom.email);
              var firstUser = Portal.userListPage.table.getFirstRow();
              expect(firstUser.getRole()).toEqual(Constants.user.roles.ADMIN);
              done();
            })
            .catch(done);
        });
      });
    });
  });
});
