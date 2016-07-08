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
                
                it('should update sslCert name on domain form when sslCert name changed',
                    function () {
                        var testSslCert = DataProvider.generateSSLCertData();
                        testSslCert.account = ['API QA Reseller Company'];

                        var testDomain = DataProvider.generateDomain('sslTestDomain');

                        var domainListPage = Portal.domains.listPage;
                        var domainAddPage = Portal.domains.addPage;
                        var domainEditPage = Portal.domains.editPage;
                        var domainForm = domainEditPage.form;

                        Portal.createSSLCert(testSslCert);

                        Portal.goToDomains();

                        domainListPage.clickAddNewDomain();
                        domainAddPage.createDomain(testDomain);
                        domainAddPage.clickBackToList();

                        domainListPage.searchAndClickEdit(testDomain.name);
                        domainForm.setSslCert(testSslCert.name);
                        domainEditPage.clickUpdateDomain();
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
                        domainListPage.searchAndClickEdit(testDomain.name);

                        var sslCertText = domainForm.getSslCert();
                        expect(sslCertText).toEqual(updatedCertName);
                        domainEditPage.clickBackToList();


                        Portal.deleteDomain(testDomain);

                        Portal.goToSslCert();
                        Portal.deleteSSLCert(testSslCert);
                    });
            });
        });
    });
});