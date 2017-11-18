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
var Constants = require('./../../../page_objects/constants');

describe('Functional', function () {
  describe('User sorting', function () {

    /*
    Using revAdmin to test this because admin doesn't have enough users
    to test 2fa, last login, last update, account sorting..
    */

    var users = [
      config.get('portal.users.revAdmin')
    ];
    var prefix = 'qa-sort-' + Date.now() + '-';
    var firstUser;
    var secondUser;

    users.forEach(function (user) {

      describe('With user: ' + user.role, function () {

        beforeAll(function (done) {
          Portal.session.setCurrentUser(user);
          Portal.helpers.users
            .create({
              firstName: prefix + '1-',
              lastName: prefix + '1-',
              role: Constants.user.roles.ADMIN
            })
            .then(function (newUser) {
              firstUser = newUser;
              Portal.helpers.users
                .create({
                  firstName: prefix + '2-',
                  lastName: prefix + '2-'
                })
                .then(function (otherUser) {
                  secondUser = otherUser;
                  Portal.signIn(user);
                  Portal.helpers.nav.goToUsers();
                  done();
                })
                .catch(done);
            })
            .catch(done);
        });

        beforeEach(function () {
          Portal.userListPage.searcher.setSearchCriteria(prefix);
        });

        afterAll(function () {
          Portal.signOut();
        });

        it('should apply `ascendant` sorting by `first name` column',
          function () {
            expect(Portal.userListPage.table.getRows().count()).toEqual(2);
            Portal.userListPage.table
              .getHeader()
              .getFirstNameCell()
              .click();
            var row = Portal.userListPage.table.getFirstRow();
            expect(row.getFirstNameCell().getText()).toContain(prefix + '1');
          });

        it('should apply `ascendant` sorting by `last name` column',
          function () {
            expect(Portal.userListPage.table.getRows().count()).toEqual(2);
            Portal.userListPage.table
              .getHeader()
              .getLastNameCell()
              .click();
            var row = Portal.userListPage.table.getFirstRow();
            expect(row.getLastNameCell().getText()).toContain(prefix + '1');
          });

        it('should apply `ascendant` sorting by `email` column',
          function () {
            expect(Portal.userListPage.table.getRows().count()).toEqual(2);
            Portal.userListPage.table
              .getHeader()
              .getEmailCell()
              .click();
            var row = Portal.userListPage.table.getFirstRow();
            expect(row.getEmailCell().getText()).toContain(prefix + '1');
          });

        it('should apply `ascendant` sorting by `role` column',
          function () {
            expect(Portal.userListPage.table.getRows().count()).toEqual(2);
            Portal.userListPage.table
              .getHeader()
              .getRoleCell()
              .click();
            var row = Portal.userListPage.table.getFirstRow();
            var userRole = row.getRoleCell().getText();
            expect(userRole).toContain(Constants.user.roles.ADMIN);
          });

        it('should apply `descendant` sorting by `first name` column',
          function () {
            expect(Portal.userListPage.table.getRows().count()).toEqual(2);
            Portal.userListPage.table
              .getHeader()
              .getFirstNameCell()
              .click()
              .click();
            var row = Portal.userListPage.table.getFirstRow();
            expect(row.getFirstNameCell().getText()).toContain(prefix + '2');
          });

        it('should apply `descendant` sorting by `last name` column',
          function () {
            expect(Portal.userListPage.table.getRows().count()).toEqual(2);
            Portal.userListPage.table
              .getHeader()
              .getLastNameCell()
              .click()
              .click();
            var row = Portal.userListPage.table.getFirstRow();
            expect(row.getLastNameCell().getText()).toContain(prefix + '2');
          });

        it('should apply `descendant` sorting by `email` column',
          function () {
            expect(Portal.userListPage.table.getRows().count()).toEqual(2);
            Portal.userListPage.table
              .getHeader()
              .getEmailCell()
              .click()
              .click();
            var row = Portal.userListPage.table.getFirstRow();
            expect(row.getEmailCell().getText()).toContain(prefix + '2');
          });

        it('should apply `descendant` sorting by `role` column',
          function () {
            expect(Portal.userListPage.table.getRows().count()).toEqual(2);
            Portal.userListPage.table
              .getHeader()
              .getRoleCell()
              .click()
              .click();
            var row = Portal.userListPage.table.getFirstRow();
            var userRole = row.getRoleCell().getText();
            expect(userRole).toContain(Constants.user.roles.USER);
          });

        it('should apply `ascendant` sorting by `2FA` column',
          function () {
            var first;
            Portal.userListPage.searcher.clearSearchCriteria();
            Portal.userListPage.table.getHeader().click2FA().then(function () {
              Portal.userListPage.table.getFirstRow().getFirstName().then(function (fa) {
                first = fa;
                Portal.userListPage.table.getHeader().click2FA().then(function () {
                  Portal.userListPage.table.getFirstRow().getFirstName().then(function (fa2) {
                    expect(first).not.toEqual(fa2);
                  });
                });
              });
            });
          });

        it('should apply `descendant` sorting by `2FA` column',
          function () {
            var first;
            Portal.userListPage.searcher.clearSearchCriteria();
            Portal.userListPage.table.getFirstRow().getFirstName().then(function (fa) {
              first = fa;
              Portal.userListPage.table.getHeader().click2FA().then(function () {
                Portal.userListPage.table.getFirstRow().getFirstName().then(function (fa2) {
                  expect(first).not.toEqual(fa2);
                });
              });
            });
          });

        it('should apply `ascendant` sorting by `Last Update` column',
          function () {
            var first;
            Portal.userListPage.searcher.clearSearchCriteria();
            Portal.userListPage.table.getHeader().clickLastUpdate().then(function () {
              Portal.userListPage.table.getFirstRow().getLastUpdate().then(function (val) {
                first = val;
                Portal.userListPage.table.getHeader().clickLastUpdate().then(function () {
                  Portal.userListPage.table.getFirstRow().getLastUpdate().then(function (val2) {
                    expect(first).toBeLessThan(val2);
                  });
                });
              });
            });
          });

        it('should apply `descendant` sorting by `Last Update` column',
          function () {
            var first;
            Portal.userListPage.searcher.clearSearchCriteria();
            Portal.userListPage.table.getFirstRow().getLastUpdate().then(function (val) {
              first = val;
              Portal.userListPage.table.getHeader().clickLastUpdate().then(function () {
                Portal.userListPage.table.getFirstRow().getLastUpdate().then(function (val2) {
                  expect(first).toBeGreaterThan(val2);
                });
              });
            });
          });

        it('should apply `ascendant` sorting by `Last Login` column',
          function () {
            var first;
            Portal.userListPage.searcher.clearSearchCriteria();
            Portal.userListPage.table.getHeader().clickLastLogin().then(function () {
              Portal.userListPage.table.getFirstRow().getLastLogin().then(function (val) {
                first = val;
                Portal.userListPage.table.getHeader().clickLastLogin().then(function () {
                  Portal.userListPage.table.getFirstRow().getLastLogin().then(function (val2) {
                    expect(first).toBeLessThan(val2);
                  });
                });
              });
            });
          });

        it('should apply `descendant` sorting by `Last Login` column',
          function () {
            var first;
            Portal.userListPage.searcher.clearSearchCriteria();
            Portal.userListPage.table.getFirstRow().getLastLogin().then(function (val) {
              first = val;
              Portal.userListPage.table.getHeader().clickLastLogin().then(function () {
                Portal.userListPage.table.getFirstRow().getLastLogin().then(function (val2) {
                  expect(first).toBeGreaterThan(val2);
                });
              });
            });
          });

        it('should apply `ascendant` sorting by `Account` column',
          function () {
            var first;
            Portal.userListPage.searcher.clearSearchCriteria();
            Portal.userListPage.table.getHeader().clickAccount().then(function () {
              Portal.userListPage.table.getFirstRow().getAccount().then(function (val) {
                first = val;
                Portal.userListPage.table.getHeader().clickAccount().then(function () {
                  Portal.userListPage.table.getFirstRow().getAccount().then(function (val2) {
                    expect(first).not.toEqual(val2);
                  });
                });
              });
            });
          });

        it('should apply `descendant` sorting by `Account` column',
          function () {
            var first;
            Portal.userListPage.searcher.clearSearchCriteria();
            Portal.userListPage.table.getFirstRow().getAccount().then(function (val) {
              first = val;
              Portal.userListPage.table.getHeader().clickAccount().then(function () {
                Portal.userListPage.table.getFirstRow().getAccount().then(function (val2) {
                  expect(first).not.toEqual(val2);
                });
              });
            });
          });
      });
    });
  });
});
