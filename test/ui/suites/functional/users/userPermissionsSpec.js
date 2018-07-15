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
var API = require('./../../../common/api').API;

describe('Functional', function () {
  describe('User permissions', function () {

    var users = [
      config.get('portal.users.admin')
    ];

    var bret;

    users.forEach(function (user) {
      describe('Side menu dynamic item display', function () {
        describe('With user: ' + user.role, function () {
          beforeAll(function () {
            Portal.signIn(user);
            bret = DataProvider.generateUser();
            if (user.role === 'Admin') {
              delete bret.role;
            } else if (user.role === 'Reseller') {
              bret.company = [user.account.companyName];
            }
            Portal.helpers.nav.goToUsers();
            Portal.userListPage.clickAddNewUser();
            Portal.addUserPage.createUser(bret);
            Portal.signOut();
            Portal.signIn(bret);
          });

          afterAll(function () {
            Portal.signOut();
          });

          beforeEach(function () {
            Portal.helpers.nav.goToUsers();
            Portal.userListPage.searchAndClickEdit(bret.email);
          });

          afterEach(function () {
          });

          var permissionItems = [
            {
              menuItem: 'Dashboards',
              permission: 'dashboards'
            },
            {
              menuItem: 'Mobile Apps',
              permission: 'mobileApps'
            },
            {
              menuItem: 'Apps Analytics',
              permission: 'mobileAnalytics'
            },
            {
              menuItem: 'Domains',
              permission: 'domains'
            },
            {
              menuItem: 'SSL Certificates',
              permission: 'sslCerts'
            },
            {
              menuItem: 'SSL Names',
              permission: 'sslNames'
            },
            {
              menuItem: 'WAF Rules',
              permission: 'wafRules'
            },
            {
              menuItem: 'Purge Cache',
              permission: 'cachePurge'
            },
            {
              menuItem: 'Web Analytics',
              permission: 'webAnalytics'
            },
            {
              menuItem: 'Security Analytics',
              permission: 'securityAnalytics'
            },
            {
              menuItem: 'DNS Zones',
              permission: 'dnsZones'
            },
            {
              menuItem: 'DNS Analytics',
              permission: 'dnsAnalytics'
            },
            {
              menuItem: 'Groups',
              permission: 'groups'
            },
            {
              menuItem: 'API Keys',
              permission: 'apiKeys'
            },
            {
              menuItem: 'Log Shipping',
              permission: 'logshippingJobs'
            },
            {
              menuItem: 'Activity Log',
              permission: 'activityLog'
            },
            {
              menuItem: 'Usage Report',
              permission: 'usageReports'
            },
            {
              menuItem: 'Billing Plans',
              permission: 'billingPlan'
            },
            {
              menuItem: 'Billing Statements',
              permission: 'billingStatements'
            },
            {
              menuItem: 'Account Profile',
              permission: 'accountProfile'
            },
          ];

          permissionItems.forEach(function (item) {
            it('should hide `' +
              item.menuItem + '` menu item when access to `' + item.permission +
              '` is disabled', function () {
                Portal.editUserPage.form.permissions.setPermission(item.permission, false);
                Portal.editUserPage.clickUpdateUser();
                expect(Portal
                  .sideMenu
                  .getMenuItem(item.menuItem).isPresent()).toBeFalsy();
              });
          });
        });
      });
    });
  });
});
