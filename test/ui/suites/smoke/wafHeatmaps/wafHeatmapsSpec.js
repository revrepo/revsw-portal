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

      describe('WAF Heatmap', function () {

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
          Portal.helpers.nav.goToWAFHeatmaps();
        });

        it('should be displayed title "WAF Heatmap"',
          function () {
            expect(Portal.wafHeatmaps.isDisplayed()).toBeTruthy();
            expect(Portal.wafHeatmaps.getTitleText()).toEqual('WAF Heatmap');
          });

        it('should be displayed button "Update Report"',
          function () {
            expect(Portal.wafHeatmaps.getUpdateReportBtn().isPresent()).toBeTruthy();
          });

        it('should be displayed dropdown "Domain Selected" ',
          function () {
            expect(Portal.wafHeatmaps.isDisplayedDomainDDown()).toBeTruthy();
          });

        it('should be displayed dropdown with time delay',
          function () {
            expect(Portal.wafHeatmaps.isDisplayedDelayDDown()).toBeTruthy();
          });
      });
    });
  });
});
