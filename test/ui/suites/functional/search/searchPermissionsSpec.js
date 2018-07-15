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
    describe('Global Search Display By Permissions', function () {
        /* jshint camelcase:false */

        var users = [
            config.portal.users.admin,
            config.portal.users.reseller
        ];

        var bret;

        users.forEach(function (user) {
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
                    Portal.globalSearcher.clearSearchCriteria();
                });

                afterEach(function () {
                });

                it('should hide dashboards from global ' +
                    'search if permission is restricted', function () {
                        Portal.editUserPage.form.permissions.setPermission('dashboards', false);
                        Portal.editUserPage.clickUpdateUser();
                        Portal.globalSearcher.setSearchCriteria('Dashboard');
                        expect(Portal.globalSearcher.getContainerEl().getText()).toBe('');
                    });

                it('should hide mobile apps from global ' +
                    'search if permission is restricted', function (done) {
                        API.authenticate(bret)
                            .then(function () {
                                API
                                    .helpers
                                    .apps
                                    .create({
                                        accountId: user.account.id
                                    })
                                    .then(function (app) {
                                        browser.refresh();
                                        Portal.globalSearcher.setSearchCriteria(app.app_name);
                                        expect(Portal
                                            .globalSearcher
                                            .getContainerEl()
                                            .getText())
                                            .toContain(app.app_name + ' iOS (Edit App)');
                                        Portal
                                            .editUserPage
                                            .form
                                            .permissions
                                            .setPermission('mobileApps', false);
                                        Portal.editUserPage.clickUpdateUser();
                                        Portal.globalSearcher.clearSearchCriteria();
                                        Portal.globalSearcher.setSearchCriteria(app.app_name);
                                        expect(Portal
                                            .globalSearcher
                                            .getContainerEl()
                                            .getText()).toBe('');
                                        Portal
                                            .editUserPage
                                            .form
                                            .permissions
                                            .setPermission('mobileApps', true);
                                        Portal.editUserPage.clickUpdateUser();
                                        done();
                                    })
                                    .catch(done);
                            });
                    });

                it('should hide mobile analytics from global ' +
                    'search if permission is restricted', function (done) {
                        API.authenticate(bret)
                            .then(function () {
                                API
                                    .helpers
                                    .apps
                                    .create({
                                        accountId: user.account.id
                                    })
                                    .then(function (app) {
                                        browser.refresh();
                                        Portal
                                            .editUserPage
                                            .form
                                            .permissions
                                            .setPermission('mobileApps', true);
                                        Portal
                                            .editUserPage
                                            .form
                                            .permissions
                                            .setPermission('mobileApps', false);

                                        Portal.editUserPage.clickUpdateUser();
                                        Portal.globalSearcher.clearSearchCriteria();
                                        Portal.globalSearcher.setSearchCriteria(app.app_name);
                                        expect(Portal
                                            .globalSearcher
                                            .getContainerEl()
                                            .getText()).not.toContain('Mobile Analytics');
                                        done();
                                    })
                                    .catch(done);
                            });
                    });

                it('should hide domains from global ' +
                    'search if permission is restricted', function (done) {
                        API.authenticate(bret)
                            .then(function () {
                                API
                                    .helpers
                                    .domainConfigs
                                    .createOne(user.account.id)
                                    .then(function (domain) {
                                        browser.refresh();
                                        Portal.globalSearcher.setSearchCriteria(domain.domain_name);
                                        expect(Portal
                                            .globalSearcher
                                            .getContainerEl()
                                            .getText())
                                            .toContain(domain.domain_name + ' (Edit Domain)');
                                        Portal
                                            .editUserPage
                                            .form
                                            .permissions
                                            .setPermission('domains', false);
                                        Portal.editUserPage.clickUpdateUser();
                                        Portal.globalSearcher.clearSearchCriteria();
                                        Portal.globalSearcher.setSearchCriteria(domain.domain_name);
                                        expect(Portal
                                            .globalSearcher
                                            .getContainerEl()
                                            .getText()).toBe('');
                                        Portal
                                            .editUserPage
                                            .form
                                            .permissions
                                            .setPermission('domains', true);
                                        Portal.editUserPage.clickUpdateUser();
                                        done();
                                    })
                                    .catch(done);
                            });
                    });

                it('should hide web analytics from global ' +
                    'search if permission is restricted', function (done) {
                        API.authenticate(bret)
                            .then(function () {
                                API
                                    .helpers
                                    .domainConfigs
                                    .createOne(user.account.id)
                                    .then(function (domain) {
                                        browser.refresh();
                                        Portal.globalSearcher.setSearchCriteria(domain.domain_name);
                                        expect(Portal
                                            .globalSearcher
                                            .getContainerEl()
                                            .getText())
                                            .toContain(domain.domain_name + ' (Web Analytics)');
                                        Portal.globalSearcher.clickReset();
                                        Portal
                                            .editUserPage
                                            .form
                                            .permissions
                                            .setPermission('webAnalytics', false);
                                        Portal.editUserPage.clickUpdateUser();
                                        Portal.globalSearcher.clearSearchCriteria();
                                        Portal.globalSearcher.setSearchCriteria(domain.domain_name);
                                        expect(Portal
                                            .globalSearcher
                                            .getContainerEl()
                                            .getText()).not.toContain('Web Analytics');
                                        done();
                                    })
                                    .catch(done);
                            });
                    });                
            });
        });
    });
});
