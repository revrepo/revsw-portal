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
          Portal.getSSLCertsPage();
          Portal.sslCerts.listPage.clickAddNewSSLCert();
        });

        afterEach(function () {
          Portal.signOut();
        })

        it('should display "Add SSL Cert" form', function () {
          expect(Portal.sslCerts.addPage.isDisplayed()).toBeTruthy();
          expect(Portal.sslCerts.addPage.form.isDisplayed()).toBeTruthy();
        });

        it('should allow to cancel a SSL cert edition', function () {
          Portal.sslCerts.addPage.form.setCertName('something');
          Portal.sslCerts.addPage.clickCancel();
          expect(Portal.sslCerts.listPage.isDisplayed()).toBeTruthy();
        });

        it('should create a SSL Cert successfully when filling all required ' +
          'data',
          function () {
            var sslCert = DataProvider.generateSSLCertData();
            Portal.sslCerts.addPage.createSSLCert(sslCert);
            expect(Portal.sslCerts.listPage
              .searchAndGetFirstRow(sslCert.name)
              .getCertName()).toEqual(sslCert.name);
            Portal.deleteSSLCert(sslCert);
          });
      });
    });
  });
});
