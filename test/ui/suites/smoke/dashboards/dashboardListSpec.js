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
    config.get('portal.users.admin'),
    config.get('portal.users.reseller')
    // config.get('portal.users.revAdmin'),
  ];


  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Dashboard list', function () {

        var dashboard = DataProvider.generateDashboardData();

        beforeAll(function () {
          Portal.signIn(user);
          Portal.createDashboard([dashboard]);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.getDashboardsPage();
          Portal.header.goTo(dashboard.title);
        });

        afterEach(function () {
        });

        it('should be displayed when clicking "Dashboards" from sidebar',
          function () {
            var leftSideDashboard = Portal.dashboards.listPage.isDisplayed();
            expect(leftSideDashboard).toBe(true);
          });

        it('should be displayed "Control Buttons" after clicked on modify ' +
          ' dashboard button in the "Dashboard" page',
          function () {
            Portal.dashboards.listPage.clickModifyDashboard();
            var ctrlbuttons1 = Portal.dashboards.listPage.existControlButtons();
            
            Portal.dashboards.listPage.clickUndoChanges();
            var ctrlbuttons2 = Portal.dashboards.listPage.existControlButtons();
            expect(ctrlbuttons1).toBe(true);
            expect(ctrlbuttons2).toBe(false);
          });
      });
    });
  });
});
