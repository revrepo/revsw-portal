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

    // Defining set of users for which all below tests will be run
    var users = [
        config.get('portal.users.revAdmin'),
        config.get('portal.users.reseller'),
        config.get('portal.users.admin'),
        config.get('portal.users.user')
    ];

    users.forEach(function (user) {

        describe('With user: ' + user.role, function () {
            describe('Add SSL Name', function () {

                beforeAll(function () {
                });

                afterAll(function () {
                });

                beforeEach(function () {
                    Portal.signIn(user);
                    Portal.goToSSLNames();
                    Portal.sslNames.listPage.clickAddNewSSLName();
                });

                afterEach(function () {
                    Portal.signOut();
                });

                it('should display "Add SSL Name" form', function () {
                    expect(Portal.sslNames.addPage.isDisplayed()).toBeTruthy();
                    expect(Portal.sslNames.addPage.form.isDisplayed()).toBeTruthy();
                });

                it('should allow to cancel a SSL name edition', function () {
                    Portal.sslNames.addPage.form.setDomainName('something');
                    Portal.sslNames.addPage.clickCancel();
                    expect(Portal.sslNames.listPage.isDisplayed()).toBeTruthy();
                });

                it('should create a SSL Name successfully when filling all required ' +
                    'data',
                    function () {
                        var sslName = DataProvider.generateSSLNameData();
                        Portal.sslNames.addPage.createSSLName(sslName);
                        Portal.dialog.clickCancel();
                        expect(Portal.sslNames.listPage
                            .searchAndGetFirstRow(sslName.domainName)
                            .getDomainName()).toEqual(sslName.domainName);
                        Portal.deleteSSLName(sslName);
                    });
            });
        });
    });
});
