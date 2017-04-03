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
    config.get('portal.users.reseller'),
    config.get('portal.users.user'),
    config.get('portal.users.revAdmin')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {

      describe('Delete Dashboards', function () {

        
        var dashboard = DataProvider.generateDashboardData();

        beforeAll(function () {
          Portal.signIn(user);
          Portal.helpers.nav.goToDashboards();
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
        });

        afterEach(function () {
        });

        it('should selected dashboard and "Delete" from edited Dashboard page (for checking with the main title)',
          function () {

            Portal.dashboards.listPage.addNewDashboard(dashboard);

            var title = Portal.dashboards.listPage.getTitle();
            expect(title).toContain(dashboard.title);

            Portal.dashboards.listPage.deleteDashboard();

            title = Portal.dashboards.listPage.getTitle();
            expect(title).not.toContain(dashboard.title);

          });
          it('should selected dashboard and "Delete" from edited Dashboard page (for checking with the sideBar item)',
            function () {

              Portal.dashboards.listPage.addNewDashboard(dashboard);

              var leftSideBar = Portal.helpers.nav.getDashboardsItems().getText();
              leftSideBar.then(function(elements) {
                elements.forEach(function(text) {
                  if (text === dashboard.title) {
                    expect(text).toContain(dashboard.title);
                  }
                });
              });

              Portal.dashboards.listPage.deleteDashboard();

              leftSideBar = Portal.helpers.nav.getDashboardsItems().getText();
              leftSideBar.then(function(elements) {
                elements.forEach(function(text) {
                  if (text === dashboard.title) {
                    expect(text).toContain(dashboard.title);
                  }
                });
              });

            });

        it('should display "Delete Dashboard" button in edited dashboard form',
          function () {
            var button = Portal.dashboards.editPage.form.getDeleteBtn();

            Portal.dashboards.listPage.clickModifyDashboard();
            Portal.dashboards.listPage.clickEditDashboardProperties();

            expect(button.isPresent()).toBeTruthy();

            Portal.dialog.clickCloseBtn();
          });

        it('should update form after clicking on dashboard name',
          function () {
            Portal.dashboards.listPage.clickModifyDashboard();
            Portal.dashboards.listPage.clickEditDashboardProperties();
            Portal.dashboards.editPage.form.setTitle(dashboard.title);
            Portal.dashboards.editPage.form.clickSave();
            
            var updatedTitle = Portal.dashboards.listPage.getTitle();

            expect(updatedTitle).toContain(dashboard.title);
          });


      });
    });
  });
});