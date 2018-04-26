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

describe('Smoke check', function () {

  var users = [
    config.get('portal.users.admin'),
    config.get('portal.users.reseller'),
    config.get('portal.users.revAdmin')
  ];

  users.forEach(function (user) {

    var testingGroup = DataProvider.generateGroup(null, user.role !== 'Admin' ? {
      account: user.account.companyName
    } : undefined);

    describe('With user - ' + user.role, function () {
      describe('Add group', function () {

        beforeAll(function () {
          Portal.signIn(user);
        });

        afterAll(function () {
          Portal.signOut();
        });

        beforeEach(function () {
          Portal.helpers.nav.goToGroups();
        });

        it('should display "Add group" form', function () {
          Portal.groups.listPage.clickAddNewGroup();
          expect(Portal.groups.addPage.form.isDisplayed()).toBeTruthy();
        });

        it('should successfully return to group list on `back to list` button click', function () {
          Portal.groups.listPage.clickAddNewGroup();
          Portal.groups.addPage.clickBackToList();
          expect(Portal.groups.listPage.isDisplayed()).toBeTruthy();
        });

        it('should clear form on `cancel` button click', function () {
          Portal.groups.listPage.clickAddNewGroup();
          Portal.groups.addPage.form.setGroupName('test-group-name');
          Portal.groups.addPage.clickCancel();
          expect(Portal.groups.listPage.isDisplayed()).toBeTruthy();
          Portal.groups.listPage.clickAddNewGroup();
          expect(Portal.groups.addPage.form.getGroupName()).toBe('');
        });

        it('should successfully create a new group', function () {
          Portal.groups.listPage.clickAddNewGroup();
          Portal.groups.addPage.createGroup(testingGroup);
          expect(Portal.alerts.getFirst().getText())
            .toContain(Constants.alertMessages.groups.MSG_SUCCESS_ADD);
          expect(Portal
            .groups
            .listPage
            .searchAndGetFirstRow(testingGroup.name)
            .getName()).toBe(testingGroup.name);
        });
      });
    });
  });
});
