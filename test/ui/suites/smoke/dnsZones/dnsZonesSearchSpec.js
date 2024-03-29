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

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.revAdmin'),
    config.get('portal.users.admin'),
    config.get('portal.users.reseller')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('DNS zones search', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function (done) {
          Portal.helpers.dnsZones
            .cleanup()
            .then(function () {
              Portal.signOut();
              done();
            })
            .catch(done);
        });

        beforeEach(function () {
          Portal.helpers.nav.goToDNSZones();
        });

        it('should be displayed when displaying DNS Zones List page',
          function () {
            var searchField = Portal.dnsZones.listPage.searcher
              .getSearchCriteriaTxtIn();
            expect(searchField.isPresent()).toBeTruthy();
          });

        it('should filter items according to text filled',
          function () {
            var dnsZoneToSearch = DataProvider.generateDNSZoneData();

            Portal.createDNSZone(dnsZoneToSearch);
            Portal.dnsZones.listPage.searcher
              .setSearchCriteria(dnsZoneToSearch.domain);
            var allRows = Portal.dnsZones.listPage.table.getRows();
            expect(allRows.count()).toEqual(1);
          });
      });
    });
  });
});
