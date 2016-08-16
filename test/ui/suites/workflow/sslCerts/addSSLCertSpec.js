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
      config.get('portal.users.user'),
      config.get('portal.users.admin'),
      config.get('portal.users.revAdmin'),
      config.get('portal.users.reseller')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {
      describe('Add SSL Cert', function () {

        var sslCertData = {
            account: ['API QA Reseller Company']
        };

        beforeAll(function () {
            Portal.signIn(user);
        });

        afterAll(function () {
            Portal.signOut();
        });

        beforeEach(function () {
            Portal.helpers.nav.goToSSLCertificates();
        });

        afterEach(function () {
          
        });
          
        it('should newly created cert has appeared in the domain configuration window',
            function () {

                var testSslCert = DataProvider.generateSSLCertData(sslCertData);
                var testDomain = DataProvider.generateDomain('sslTestDomain');
                Portal.createSSLCert(testSslCert);
                Portal.helpers.nav.goToDomains();
                Portal.domains.listPage.clickAddNewDomain();
                Portal.domains.addPage.createDomain(testDomain);
                Portal.domains.addPage.clickBackToList();
                Portal.domains.listPage.searchAndClickEdit(testDomain.name);
                var newAddedSSLItemText = Portal.domains.editPage.form.getSslCertDDownItems()
                    .last().getText();
                expect(newAddedSSLItemText).toBe(testSslCert.name);
                Portal.domains.editPage.clickBackToList();
                Portal.deleteDomain(testDomain);

                Portal.helpers.nav.goToSSLCertificates();
                Portal.deleteSSLCert(testSslCert);
            });          
          
        it('should create an ssl certificate and add to domain successfully',
            function () {
                var testSslCert = DataProvider.generateSSLCertData(sslCertData);
                var testDomain = DataProvider.generateDomain('sslTestDomain');
                Portal.createSSLCert(testSslCert);
                Portal.helpers.nav.goToDomains();
                Portal.domains.listPage.clickAddNewDomain();
                Portal.domains.addPage.createDomain(testDomain);
                Portal.domains.addPage.clickBackToList();
                Portal.domains.listPage.searchAndClickEdit(testDomain.name);
                Portal.domains.editPage.form.setSslCert(testSslCert.name);
                Portal.domains.editPage.clickUpdateDomain();
                Portal.dialog.clickOk();
                Portal.domains.editPage.clickBackToList();
                Portal.domains.listPage.searchAndClickEdit(testDomain.name);
                var sslCertText = Portal.domains.editPage.form.getSslCert();
                expect(sslCertText).toEqual(testSslCert.name);
                Portal.domains.editPage.clickBackToList();
                Portal.deleteDomain(testDomain);

                Portal.helpers.nav.goToSSLCertificates();
                Portal.deleteSSLCert(testSslCert);
            });
      });
    });
  });
});
