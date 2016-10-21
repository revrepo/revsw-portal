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
var Constants = require('./../../../page_objects/constants');

describe('Functional', function () {
  describe('User list', function () {

    var users = [
      config.get('portal.users.admin')
    ];

    users.forEach(function (user) {

      describe('With user: ' + user.role, function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        afterEach(function () {
          Portal.helpers.nav.goToDashboards();
        });

        it('should display N items maximum in the page (25 items by default)',
          function () {
            var expectedUsersPerPage = 25;
            Portal.helpers.nav.goToUsers();
            var tableRows = Portal.userListPage.table.getRows();
            expect(tableRows.count()).not.toBeGreaterThan(expectedUsersPerPage);
          });

        it('should display a new user created', function (done) {
          Portal.helpers.users
            .create()
            .then(function (andrew) {
              Portal.helpers.nav.goToUsers();
              var user = Portal.userListPage.searchAndGetFirstRow(andrew.email);
              expect(user.getFirstName()).toEqual(andrew.firstName);
              expect(user.getLastName()).toEqual(andrew.lastName);
              expect(user.getEmail()).toEqual(andrew.email);
              expect(user.getRole()).toEqual(andrew.role);
              done();
            })
            .catch(done);
        });

        it('should list all child users created by an specific "Admin" user',
          function (done) {
            Portal.helpers.users
              .create()
              .then(function (scott) {
                Portal.helpers.users
                  .create({
                    role: Constants.user.roles.ADMIN
                  })
                  .then(function (frank) {
                    Portal.helpers.nav.goToUsers();
                    var firstUser = Portal.userListPage.searchAndGetFirstRow(scott.email);
                    expect(firstUser.getFirstName()).toEqual(scott.firstName);
                    expect(firstUser.getLastName()).toEqual(scott.lastName);
                    expect(firstUser.getEmail()).toEqual(scott.email);
                    expect(firstUser.getRole()).toEqual(scott.role);
                    firstUser = Portal.userListPage.searchAndGetFirstRow(frank.email);
                    expect(firstUser.getFirstName()).toEqual(frank.firstName);
                    expect(firstUser.getLastName()).toEqual(frank.lastName);
                    expect(firstUser.getEmail()).toEqual(frank.email);
                    expect(firstUser.getRole()).toEqual(frank.role);
                    done();
                  })
                  .catch(done);
              })
              .catch(done);
          });
      });
    });
  });
});
