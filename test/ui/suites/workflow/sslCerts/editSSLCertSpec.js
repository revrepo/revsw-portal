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

describe('Workflow', function () {

    // Defining set of users for which all below tests will be run
    var users = [
        config.get('portal.users.revAdmin')
    ];

    users.forEach(function (user) {

        describe('With user: ' + user.role, function () {
            describe('Edit SSL Cert', function () {

                beforeAll(function () {
                    Portal.signIn(user);
                });

                afterAll(function () {
                    Portal.signOut();
                });

                beforeEach(function () {
                    Portal.goToSslCert();
                });

                afterEach(function () {
                });

                it('should be possible to edit certificate which is in use',
                    function () {
                        var testSslCert = DataProvider.generateSSLCertData();
                        testSslCert.account = ['API QA Reseller Company'];
                        var testDomain = DataProvider.generateDomain('sslTestDomain');
                        Portal.createSSLCert(testSslCert);
                        Portal.goToDomains();
                        Portal.domains.listPage.clickAddNewDomain();
                        Portal.domains.addPage.createDomain(testDomain);
                        Portal.domains.addPage.clickBackToList();
                        Portal.domains.listPage.searchAndClickEdit(testDomain.name);
                        Portal.domains.editPage.form.setSslCert(testSslCert.name);
                        Portal.domains.editPage.clickUpdateDomain();
                        Portal.dialog.clickOk();
                        Portal.goToSslCert();
                        Portal.sslCerts.listPage.searcher.setSearchCriteria(testSslCert.name);
                        Portal.sslCerts.listPage.table
                            .getFirstRow()
                            .clickEdit();
                        var valueAdded = ' updated';
                        Portal.sslCerts.editPage.form.setCertName(valueAdded);
                        Portal.sslCerts.editPage.clickUpdate();
                        Portal.dialog.clickOk();
                        var updatedCertName = Portal.sslCerts.editPage.form.getCertName();
                        Portal.goToSslCert();
                        Portal.sslCerts.listPage.searcher.clearSearchCriteria();
                        Portal.sslCerts.listPage.searcher.setSearchCriteria(updatedCertName);
                        var tableRows = Portal.sslCerts.listPage.table.getRows();
                        expect(tableRows.count()).toEqual(1);
                        Portal.goToDomains();
                        Portal.deleteDomain(testDomain);
                        Portal.goToSslCert();
                        Portal.deleteSSLCert(testSslCert);
                    });

                it('should disappear from domain form when sslCert account changed',
                    function () {
                        var testSslCert = DataProvider.generateSSLCertData();
                        testSslCert.account = ['API QA Reseller Company'];
                        var testDomain = DataProvider.generateDomain('sslTestDomain');
                        Portal.createSSLCert(testSslCert);
                        Portal.goToDomains();
                        Portal.domains.listPage.clickAddNewDomain();
                        Portal.domains.addPage.createDomain(testDomain);
                        Portal.domains.addPage.clickBackToList();
                        Portal.domains.listPage.searchAndClickEdit(testDomain.name);
                        Portal.domains.editPage.form.setSslCert(testSslCert.name);
                        Portal.domains.editPage.clickUpdateDomain();
                        Portal.dialog.clickOk();
                        Portal.goToSslCert();
                        Portal.sslCerts.listPage.searcher.setSearchCriteria(testSslCert.name);
                        Portal.sslCerts.listPage.table
                            .getFirstRow()
                            .clickEdit();
                        var changedAccName = ['Portal UI QA Company'];
                        Portal.sslCerts.editPage.form.setAccount(changedAccName);
                        Portal.sslCerts.editPage.clickUpdate();
                        Portal.dialog.clickOk();
                        Portal.goToDomains();
                        Portal.domains.listPage.searchAndClickEdit(testDomain.name);
                        var sslCertText = Portal.domains.editPage.form.getSslCert();
                        expect(sslCertText).toEqual('Default RevAPM SSL Certificate');
                        Portal.domains.editPage.clickBackToList();
                        Portal.deleteDomain(testDomain);
                        Portal.goToSslCert();
                        Portal.deleteSSLCert(testSslCert);
                    });

                it('should update sslCert name on domain form when sslCert name changed',
                    function () {
                        var testSslCert = DataProvider.generateSSLCertData();
                        testSslCert.account = ['API QA Reseller Company'];
                        var testDomain = DataProvider.generateDomain('sslTestDomain');
                        Portal.createSSLCert(testSslCert);
                        Portal.goToDomains();
                        Portal.domains.listPage.clickAddNewDomain();
                        Portal.domains.addPage.createDomain(testDomain);
                        Portal.domains.addPage.clickBackToList();
                        Portal.domains.listPage.searchAndClickEdit(testDomain.name);
                        Portal.domains.editPage.form.setSslCert(testSslCert.name);
                        Portal.domains.editPage.clickUpdateDomain();
                        Portal.dialog.clickOk();
                        Portal.goToSslCert();
                        Portal.sslCerts.listPage.searcher.setSearchCriteria(testSslCert.name);
                        Portal.sslCerts.listPage.table
                            .getFirstRow()
                            .clickEdit();
                        var valueAdded = ' updated';
                        Portal.sslCerts.editPage.form.setCertName(valueAdded);
                        Portal.sslCerts.editPage.clickUpdate();
                        Portal.dialog.clickOk();
                        var updatedCertName = Portal.sslCerts.editPage.form.getCertName();
                        Portal.goToDomains();
                        Portal.domains.listPage.searchAndClickEdit(testDomain.name);
                        var sslCertText = Portal.domains.editPage.form.getSslCert();
                        expect(sslCertText).toEqual(updatedCertName);
                        Portal.domains.editPage.clickBackToList();
                        Portal.deleteDomain(testDomain);
                        Portal.goToSslCert();
                        Portal.deleteSSLCert(testSslCert);
                    });
            });
        });
    });
});