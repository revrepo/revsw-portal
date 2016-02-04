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

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    {
      type: 'Admin',
      data: config.get('portal.users.admin')
    }, {
      type: 'Rev Admin',
      data: config.get('portal.users.revAdmin')
    }
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.type, function () {

      describe('Domain Search', function () {

        var currentUser = user.data;

        beforeAll(function () {
          Portal.signIn(currentUser);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.getDomainsPage();
        });

        it('should be displayed when displaying Domain List page',
          function () {
            var searchField = Portal.domains.listPage.searcher
              .getSearchCriteriaTxtIn();
            expect(searchField.isPresent()).toBeTruthy();
          });

        it('should filter items according to text filled',
          function () {
            var domainNameToSearch = Portal.domains.listPage.domainsTbl
              .getFirstRow()
              .getName();
            Portal.domains.listPage.searcher
              .setSearchCriteria(domainNameToSearch);
            var allRows = Portal.domains.listPage.domainsTbl.getRows();
            expect(allRows.count()).toEqual(1);
          });
      });
    });
  });
});
