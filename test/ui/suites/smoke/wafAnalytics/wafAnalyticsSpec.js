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

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.revAdmin')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('WAF Analytics', function () {

        beforeAll(function (done) {
          Portal.signIn(user)
            .then(function () {
              done();
            })
            .catch(done);
        });

        afterAll(function (done) {
          Portal.signOut()
            .then(function () {
              done();
            })
            .catch(done);
        });

        beforeEach(function () {
          Portal.helpers.nav.goToWAFAnalytics();
        });

        it('should be displayed title "WAF Analytics"',
          function () {
            expect(Portal.wafAnalitycs.isDisplayed()).toBeTruthy();
            expect(Portal.wafAnalitycs.getTitleText()).toEqual('WAF Analytics');
          });

        it('should be displayed dropdown "Domain Selected" on page',
          function () {
            expect(Portal.wafAnalitycs.isDisplayedDomainDDown()).toBeTruthy();
          });

        it('should be displayed three buttons "Update Report"',
          function () {
            expect(Portal.wafAnalitycs.getAllUpdateReportBtns().count()).toEqual(3);
          });

        describe('Text on the page', function () {
          var result;
          var listDisplayedText = [
            'Top 20 Countries',
            'Top 20 Rule IDs',
            'Attacks By Target Request Zones',
            'Security Events',
            'Top Attacked URLs',
            'Most Active Attacker IP Addresses'
          ];

          beforeAll(function (done) {
            Portal.wafAnalitycs.getPageContentText()
              .then(function (dataText) {
                result = dataText;
                done();
              });
          });

          listDisplayedText.forEach(function (itemText) {
            it('should be displayed text "' + itemText + '"',
              function () {
                expect(result).toContain(itemText);
              });
          });

        });

      });
    });
  });
});
