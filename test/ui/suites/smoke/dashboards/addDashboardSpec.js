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

describe('Smoke', function () {

  // Defining set of users for which all below tests will be run
  var users = [
    config.get('portal.users.revAdmin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.admin')
  ];
  var dashboard = DataProvider.generateDashboardData();
  var hasElementWithText = function(textElements, customTitle) {
    var result = false;
    textElements.forEach(function(text) {
      if (text === (customTitle || dashboard.title)) {
        result = text;
      }
    });   
    return result;
  };

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Add Dashboard', function () {

        beforeAll(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToDashboards();
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
        });

        it('should default "My Dashboard" exist in Dasboards page', function () {
          var defaultDashboardName = 'My Dashboard';
          var createdDashboard = Portal.dashboards.listPage.getTitle();
          var leftMenu = Portal.helpers.nav.getDashboardsItems().getText();
          var existDashChart = Portal.dashboards.listPage.existDashboardChart();

          leftMenu.then(function(elementText) {
            expect(hasElementWithText(elementText, defaultDashboardName))
              .toContain(defaultDashboardName);
          });

          expect(existDashChart).toBe(true);
        });

        it('should "Add Dashboard" in Dashboard Page - Structure - ' +
          'Two Columns Of Equal Width - Every 15 Minutes',
          function () {
            
            dashboard.structure = 1;

            Portal.dashboards.listPage.addNewDashboard(dashboard);
            var dashboardTitle = Portal.dashboards.listPage.getTitle();
            var leftMenu = Portal.helpers.nav.getDashboardsItems().getText();
            var existChart = Portal.dashboards.listPage.existDashboardChart();

            expect(dashboardTitle).toContain(dashboard.title);

            leftMenu.then(function(elementText) {
              expect(hasElementWithText(elementText)).toContain(dashboard.title);
            });


            expect(existChart).toBe(true);

            Portal.dashboards.listPage.deleteDashboard(dashboard);
          });

        it('should "Add Dashboard" in Dashboard Page - Structure - ' +
          'One Wide Column - Every 1 Minute',
          function () {
            dashboard.structure = 0;

            Portal.dashboards.listPage.addNewDashboard(dashboard);
            var createdDashboard = Portal.dashboards.listPage.getTitle();
            var leftMenu = Portal.helpers.nav.getDashboardsItems().getText();
            var existChart = Portal.dashboards.listPage.existDashboardChart();

            expect(createdDashboard).toContain(dashboard.title);
            leftMenu.then(function(elementText) {
              expect(hasElementWithText(elementText)).toContain(dashboard.title);
            });
            expect(existChart).toBe(true);

            Portal.dashboards.listPage.deleteDashboard(dashboard);
          });

        it('should "Add Dashboard" in Dashboard Page - Structure - ' +
          'Four Columns Of Equal Width - No Auto-Refresh',
          function () {
            dashboard.structure = 4;

            Portal.dashboards.listPage.addNewDashboard(dashboard);
            var createdDashboard = Portal.dashboards.listPage.getTitle();
            var leftMenu = Portal.helpers.nav.getDashboardsItems().getText();
            var existChart = Portal.dashboards.listPage.existDashboardChart();

            expect(createdDashboard).toContain(dashboard.title);
            leftMenu.then(function(elementText) {
              expect(hasElementWithText(elementText)).toContain(dashboard.title);
            });
            expect(existChart).toBe(true);

            Portal.dashboards.listPage.deleteDashboard(dashboard);
          });
      });
    });
  });
});
