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
var DataProvider = require('./../../../common/providers/data');
var Portal = require('./../../../page_objects/portal');

describe('Workflow', function () {

    // Defining set of users for which all below tests will be run
    var users = [
        //config.get('portal.users.user'),
        //config.get('portal.users.admin'),
        config.get('portal.users.revAdmin')
        //config.get('portal.users.reseller')
    ];

    users.forEach(function (user) {

        describe('With user: ' + user.role, function () {

            describe('Domain Versions', function () {

                beforeAll(function () {
                    Portal.signIn(user);
                });

                afterAll(function () {
                    Portal.signOut();
                });

                beforeEach(function () {
                    Portal.goToDomains();
                });

                it('should the Version "0" message appears for modified domain',
                    function () {
                        var message = 'Version "0" is the currently modified but ' +
                            'not yet published domain configuration';
                        
                        var testDomain = DataProvider.generateDomain('versTestDomain');

                        Portal.domains.listPage.clickAddNewDomain();
                        Portal.domains.addPage.createDomain(testDomain);
                        Portal.domains.addPage.clickBackToList();

                        Portal.domains.listPage.searchAndClickEdit(testDomain.name);
                        Portal.domains.editPage.form.setOriginHostHeader('.upd');
                        Portal.domains.editPage.clickUpdateDomain();
                        Portal.dialog.clickOk();
                        Portal.domains.addPage.clickBackToList();

                        Portal.domains.listPage.searchAndGetFirstRow(testDomain.name)
                            .clickVersions();

                        expect(Portal.domains.versionsPage.getDomainConfigVersionWarning()
                            .getText()).toBe(message);

                        Portal.goToDomains();
                        Portal.deleteDomain(testDomain);
                    });
            });
        });
    });
});