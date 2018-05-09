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
var Portal = require('./../../../../page_objects/portal');
var DataProvider = require('./../../../../common/providers/data');
var Constants = require('./../../../../page_objects/constants');
var API = require('./../../../../common/api').API;

describe('Functional', function () {

    describe('API Keys Sorting', function () {

        var user = config.get('portal.users.admin');

        beforeAll(function () {
            Portal.signIn(user);
            Portal.helpers.nav.goToAPIKeys();
            Portal.admin.apiKeys.listPage.clickAddNewApiKey();
        });

        afterAll(function () {
            Portal.signOut();
        });

        beforeEach(function () {
            Portal.helpers.nav.goToAPIKeys();
        });

        afterEach(function () {
        });

        it('should display `Never` in last used date column for a newly created API Key',
            function () {
                expect(Portal
                    .admin
                    .apiKeys
                    .listPage
                    .searchAndGetFirstRow('New API Key').getLastUsedAt()).toBe('Never');
            });

        it('should display `a few seconds ago` in last used date' +
            'column after making a request with the API Key',
            function (done) {
                Portal
                    .admin
                    .apiKeys
                    .listPage
                    .searchAndGetFirstRow('New API Key')
                    .getAPICode()
                    .then(function (key) {
                        API
                            .authenticate(user)
                            .then(function () {
                                API
                                    .resources
                                    .apiKeys
                                    .getAll()
                                    .expect(200)
                                    .then(function (res) {
                                        res.body.forEach(function (_key) {
                                            if (_key.key === key) {
                                                API.authenticate(_key)
                                                    .then(function () {
                                                        Portal.helpers.nav.goToDomains();
                                                        Portal.helpers.nav.goToAPIKeys();
                                                        expect(Portal
                                                            .admin
                                                            .apiKeys
                                                            .listPage
                                                            .searchAndGetFirstRow('New API Key')
                                                            .getLastUsedAt())
                                                            .toBe('a few seconds ago');
                                                        done();
                                                    });
                                            }
                                        });
                                    })
                                    .catch(done);
                            });
                    });
            });

        it('should display a valid IP  in last used from ' +
            'column after making a request with the API Key',
            function (done) {
                var ipRegex = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;
                Portal
                    .admin
                    .apiKeys
                    .listPage
                    .searchAndGetFirstRow('New API Key')
                    .getAPICode()
                    .then(function (key) {
                        API
                            .authenticate(user)
                            .then(function () {
                                API
                                    .resources
                                    .apiKeys
                                    .getAll()
                                    .expect(200)
                                    .then(function (res) {
                                        res.body.forEach(function (_key) {
                                            if (_key.key === key) {
                                                API.authenticate(_key)
                                                    .then(function () {
                                                        Portal.helpers.nav.goToDomains();
                                                        Portal.helpers.nav.goToAPIKeys();
                                                        expect(Portal
                                                            .admin
                                                            .apiKeys
                                                            .listPage
                                                            .searchAndGetFirstRow('New API Key')
                                                            .getLastUsedFrom())
                                                            .toMatch(ipRegex);
                                                        done();
                                                    });
                                            }
                                        });
                                    })
                                    .catch(done);
                            });
                    });
            });
    });
});