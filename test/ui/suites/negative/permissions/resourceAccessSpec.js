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

        var user = config.get('portal.users.admin');

        var permissionItems = [
            {
                link: 'dashboards',
                permission: 'dashboards'
            },
            {
                link: 'apps',
                permission: 'mobileApps'
            },
            {
                link: 'mobile/traffic',
                permission: 'mobileAnalytics'
            },
            {
                link: 'domains',
                permission: 'domains'
            },
            {
                link: 'ssl_certs',
                permission: 'sslCerts'
            },
            {
                link: 'ssl_names',
                permission: 'sslNames'
            },
            {
                link: 'waf_rules',
                permission: 'wafRules'
            },
            {
                link: 'cache/purge',
                permission: 'cachePurge'
            },
            {
                link: 'reports/proxy',
                permission: 'webAnalytics'
            },
            {
                link: 'security/waf',
                permission: 'securityAnalytics'
            },
            {
                link: 'dns/zones',
                permission: 'dnsZones'
            },
            {
                link: 'dns/analytics',
                permission: 'dnsAnalytics'
            },
            {
                link: 'groups',
                permission: 'groups'
            },
            {
                link: 'keys',
                permission: 'apiKeys'
            },
            {
                link: 'logshippers',
                permission: 'logshippingJobs'
            },
            {
                link: 'activitylog',
                permission: 'activityLog'
            },
            {
                link: 'usage',
                permission: 'usageReports'
            },
            {
                link: 'profile/plans',
                permission: 'billingPlan'
            },
            {
                link: 'account',
                permission: 'accountProfile'
            },
        ];

        var bret;
        describe('Resources Access With user: ' + user.role, function () {
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

            beforeEach(function () {
                Portal.helpers.nav.goToUsers();
                Portal.userListPage.searchAndClickEdit(bret.email);
            });

            afterAll(function () {
                Portal.signOut();
            });

            permissionItems.forEach(function (item) {
                it('should not be able to access `' +
                    item.link + '` resource (link) when access to `' + item.permission +
                    '` is disabled', function (done) {
                        Portal.editUserPage.form.permissions.setPermission(item.permission, false);
                        Portal.editUserPage.clickUpdateUser();
                        Portal.helpers.nav.goToUsers().then(function () {
                            browser.get(Portal.baseUrl + '/#/' + item.link + '/');
                            expect(browser.getCurrentUrl()).not.toContain(item.link);
                            done();
                        });                        
                    });
            });
        });
    });
});
