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
  describe('Reseller role user', function () {

    var users = [
      config.get('portal.users.reseller')
    ];
    var secondResellerUser = config.get('portal.users.secondReseller');

    users.forEach(function (user) {

      describe('With user: ' + user.role, function () {

        beforeEach(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToUsers();
        });

        afterEach(function () {
          Portal.signOut();
        });

        it('should display a user only for one reseller user',
          function () {
            var userEmail = Portal.userListPage.table
              .getFirstRow()
              .getEmail();
            Portal.signOut();
            Portal.signIn(secondResellerUser);
            Portal.helpers.nav.goToUsers();
            Portal.userListPage.searcher.setSearchCriteria(userEmail);
            var filteredRows = Portal.userListPage.table.getRows();
            expect(filteredRows.count()).toEqual(0);
          });

        it('should display new created user only for the reseller who ' +
          'created it',
          function (done) {
            Portal.helpers.users
              .create()
              .then(function (testUser) {
                var userEmail = Portal.userListPage
                  .searchAndGetFirstRow(testUser.email)
                  .getEmail();
                var filteredRows = Portal.userListPage.table.getRows();
                expect(filteredRows.count()).toEqual(1);
                Portal.signOut();
                Portal.signIn(secondResellerUser);
                Portal.helpers.nav.goToUsers();
                Portal.userListPage.searcher.setSearchCriteria(userEmail);
                var newFilteredRows = Portal.userListPage.table.getRows();
                expect(newFilteredRows.count()).toEqual(0);
                done();
              })
              .catch(done);
          });
      });
    });
  });
});
