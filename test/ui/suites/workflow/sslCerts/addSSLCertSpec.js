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
    config.get('portal.users.revAdmin')
  ];

  users.forEach(function (user) {

    describe('With user: ' + user.role, function () {
      describe('Add SSL Cert', function () {

        beforeAll(function () {
        });

        afterAll(function () {
        });

        beforeEach(function () {
          Portal.signIn(user);
          Portal.goToSslCert();
        });

        afterEach(function () {
          Portal.signOut();
        });

        it('should create an ssl certificate and add to domain successfully',
            function () {
                var testSslCert = DataProvider.generateSSLCertData();
                testSslCert.account = 'API QA Reseller Company';

                var testDomain = DataProvider.generateDomain('sslTestDomain');

                var listPage = Portal.domains.listPage;
                var addPage = Portal.domains.addPage;
                var editPage = Portal.domains.editPage;
                var domainForm = editPage.form;

                Portal.createSSLCert(testSslCert);

                Portal.goToDomains();

                listPage.clickAddNewDomain();
                addPage.createDomain(testDomain);
                addPage.clickBackToList();

                listPage.searchAndClickEdit(testDomain.name);
                domainForm.setSslCert(testSslCert.name);
                editPage.clickUpdateDomain();
                Portal.dialog.clickOk();
                editPage.clickBackToList();

                listPage.searchAndClickEdit(testDomain.name);

                sslCertText = domainForm.getSslCertDDown().getText();
                expect(sslCertText).toEqual(testSslCert.name);
                editPage.clickBackToList();

                Portal.deleteDomain(testDomain);
            });
      });
    });
  });
});
