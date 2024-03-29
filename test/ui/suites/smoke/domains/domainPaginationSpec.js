/*************************************************************************
 *
 * REV SOFTWARE CONFIDENTIAL
 *
 * [2013] - [2018] Rev Software, Inc.
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

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
//    config.get('portal.users.admin'),
    // Enabling the test only for revadmin role and removing the large amount of per-role
    // domains used to create the mass of domains necessary to activate the pagination feature
    config.get('portal.users.revAdmin'),
//    config.get('portal.users.reseller')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Domain pagination', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToDomains();
        });

        // The test WILL fail if the total number of domains registered in the test environment
        // is below portal.$config.DEFAULT_LIMIT_RECORDS_IN_TABLE
        it('should be displayed when displaying Domain List page',
          function () {
            var currPageBtn = Portal.domains.listPage.pager
              .getCurrentPageIndexBtn();
            expect(currPageBtn.isPresent()).toBeTruthy();
          });
      });
    });
  });
});
