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

describe('Workflow', function () {

    var user = config.get('portal.users.admin');

    describe('With user: ' + user.role, function () {
        /* api json is all camel_case */
        /* jshint camelcase:false */
        describe('API Key Add Edit Integrity', function () {
            var newKey = DataProvider.generateApiKeyData();
            var newKeyUpdated = newKey;
            var keyObj = {};
            beforeAll(function (done) {
                Portal.signIn(user);
                Portal.helpers.nav.goToAPIKeys();
                Portal.admin.apiKeys.listPage.clickAddNewApiKey();
                Portal.admin.apiKeys.listPage.searchAndClickEdit('New API Key');
                Portal.admin.apiKeys.editPage.updateKey(newKey).then(function () {
                    Portal.apiKeysHelpers.getAPIKey(newKey.name).then(function (key) {
                        keyObj = key;
                        done();
                    });
                });
            });

            afterAll(function () {
                Portal.signOut();
            });

            beforeEach(function () {
                Portal.helpers.nav.goToAPIKeys();
                Portal.admin.apiKeys.listPage.searchAndClickEdit(newKey.name);
            });

            it('should contain correct data in a newly created API Key JSON object',
                function () {
                    expect(keyObj.key_name).toBe(newKey.name);
                    expect(keyObj.active).toBeTruthy();
                });

            it('should display correct data in the API Key UI elements',
                function () {
                    Portal
                    .admin
                    .apiKeys
                    .editPage
                    .form
                    .getName()
                    .then(function (val) {
                        expect(val).toBe(keyObj.key_name);
                    });

                Portal
                    .admin
                    .apiKeys
                    .editPage
                    .form
                    .getKey()
                    .then(function (val) {
                        expect(val).toBe(keyObj.key);
                    });

                Portal
                    .admin
                    .apiKeys
                    .editPage
                    .form
                    .getActive().then(function (val) {
                        expect(val).toBe(keyObj.active);
                    });
                });

            it('should contain correct data in the API Key JSON object after update',
                function (done) {
                    newKeyUpdated.name += ' NEW';

                    Portal.admin.apiKeys.editPage.form.setName(newKeyUpdated.name);
                    Portal.admin.apiKeys.editPage.clickUpdate();
                    Portal.alerts.waitToDisplay().then(function () {
                        Portal
                            .apiKeysHelpers
                            .getAPIKey(newKeyUpdated.name)
                            .then(function (key) {
                                keyObj = key;
                                expect(keyObj.key_name).toBe(newKeyUpdated.name);
                                expect(keyObj.active).toBeTruthy();
                                done();
                            });

                    });
                });

            it('should display correct data in the API Key UI elements after update',
                function () {
                    Portal
                        .admin
                        .apiKeys
                        .editPage
                        .form
                        .getName()
                        .then(function (val) {
                            expect(val).toBe(keyObj.key_name);
                        });

                    Portal
                        .admin
                        .apiKeys
                        .editPage
                        .form
                        .getKey()
                        .then(function (val) {
                            expect(val).toBe(keyObj.key);
                        });

                    Portal
                        .admin
                        .apiKeys
                        .editPage
                        .form
                        .getActive().then(function (val) {
                            expect(val).toBe(keyObj.active);
                        });                    
                });
        });
    });
});
