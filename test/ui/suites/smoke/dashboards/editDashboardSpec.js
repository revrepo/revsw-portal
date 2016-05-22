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

      describe('Edit Dashboards', function () {

        var dashboard = DataProvider.generateDashboardData();

        beforeAll(function () {
          Portal.signIn(user);
          Portal.createDashboard([dashboard]);
        });

        afterAll(function () {
          Portal.deleteDashboard([dashboard]);
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.getDashboardsPage();
          Portal.header.goTo(dashboard.title);

          Portal.dashboards.listPage.selectDashboard(dashboard.title);
          Portal.dashboards.listPage.clickModifyDashboard();
          Portal.dashboards.listPage.clickEditDashboardProperties();
        });

        afterEach(function () {
        });

        it('should display "Edit" dashboard page',
          function () {
            var formTitle = Portal.dashboards.editPage.getTitle();
            expect(formTitle).toEqual('Edit Dashboard');
          });

        it('should display "Delete Dashboard" button in edited dashboard form',
          function () {
            var button = Portal.dashboards.editPage.form.getDeleteBtn();
            expect(button.isPresent()).toBeTruthy();
          });

        it('should display "Cancel" button in edited dashboard form',
          function () {
            var button = Portal.dashboards.editPage.form.getCancelBtn();
            expect(button.isPresent()).toBeTruthy();
          });

        it('should display "Save" button in edited dashboard form',
          function () {
            var button = Portal.dashboards.editPage.form.getCreateBtn();
            expect(button.isPresent()).toBeTruthy();
          });

        it('should display "Autho-Refresh" drop down in edited dashboard form',
          function () {
            var refresh = Portal.dashboards.editPage.form.getAutoRefreshDDown();
            expect(refresh.isPresent()).toBeTruthy();
          });

        it('should display "One Wide Column" structure in edited dashboard',
          function () {
            var radio = Portal.dashboards.editPage.form.getStructuresRadios(0);
            expect(radio.isPresent()).toBeTruthy();
          });

        it('should display "Four Columns Of Equal Width" in edited dashboard',
          function () {
            var radio = Portal.dashboards.editPage.form.getStructuresRadios(4);
            expect(radio.isPresent()).toBeTruthy();
          });

        it('should update form after clicking on dashboard name',
          function () {
            var tempTitle = dashboard.title;
            dashboard.title = dashboard.title + '-UPDATED';
            Portal.dashboards.editPage.form.fill(dashboard);
            Portal.dashboards.editPage.form.clickCreate();
            
            var updatedTitle = Portal.dashboards.listPage.getTitle();
            expect(updatedTitle).toContain(dashboard.title);
          });
      });
    });
  });
});
