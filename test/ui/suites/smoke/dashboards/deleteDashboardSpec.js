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

  var users = [
    config.get('portal.users.admin'),
    // config.get('portal.users.reseller')
    // config.get('portal.users.revAdmin'),
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Delete Dashboards', function () {

        var dashboard = DataProvider.generateDashboardData();

        beforeAll(function () {
          Portal.signIn(user);
          // Portal.createDashboard([dashboard]);
        });

        afterAll(function () {
          //Portal.deleteDashboard([dashboard]);
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToDashboards();
        });

        afterEach(function () {
        });

        it('should selected dashboard and "Delete" from edited Dashboard page',
          function () {
            Portal.helpers.nav.goToDashboards();
            Portal.dashboards.listPage.addNewDashboard(dashboard);

            var title = Portal.dashboards.listPage.getTitle();
            var leftSide = Portal.dashboards.listPage.getLeftMenuDashboards();
            expect(title).toContain(dashboard.title);
            expect(leftSide).toContain(dashboard.title);

            Portal.dashboards.listPage.deleteDashboard(dashboard);
            Portal.dashboards.dialogPage.clickDelete();

            title = Portal.dashboards.listPage.getTitle();
            leftSide = Portal.dashboards.listPage.getLeftMenuDashboards();
            expect(title).not.toContain(dashboard.title);
            expect(leftSide).not.toContain(dashboard.title);
          });

        // it('should display "Delete Dashboard" button in edited dashboard form',
        //   function () {
        //     var button = Portal.dashboards.editPage.form.getDeleteBtn();
        //     expect(button.isPresent()).toBeTruthy();
        //   });

        // it('should update form after clicking on dashboard name',
        //   function () {
        //     var tempTitle = dashboard.title;
        //     dashboard.title = dashboard.title + '-UPDATED';
        //     Portal.dashboards.editPage.form.fill(dashboard);
        //     Portal.dashboards.editPage.form.clickCreate();
            
        //     var updatedTitle = Portal.dashboards.listPage.getTitle();
        //     expect(updatedTitle).toContain(dashboard.title);
        //   });
      });
    });
  });
});