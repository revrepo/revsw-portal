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

describe('Workflow', function () {

  var user = config.get('portal.users.admin');

  describe('With user: ' + user.role, function () {
    /* api json is all camel_case */
    /* jshint camelcase:false */
    describe('SSL Cert Add Edit Integrity', function () {

      var sslCertData = {
        account: [user.account.companyName]
      };
      var testSslCert = DataProvider.generateSSLCertData(sslCertData);
      var testSslCertUpdated = DataProvider.generateSSLCertData(sslCertData);
      var testDomain = DataProvider.generateDomain('sslTestDomain');
      var sslCert = {};
      beforeAll(function (done) {
        Portal.signIn(user);
        Portal.helpers.nav.goToSSLCertificates();
        Portal.createSSLCert(testSslCert).then(function () {
          Portal.sslCertHelpers.getSSLCert(testSslCert.name).then(function (cert) {
            sslCert = cert;
            done();
          });
        });
      });

      afterAll(function () {
        Portal.signOut();
      });

      beforeEach(function () {
        Portal.helpers.nav.goToSSLCertificates();
        Portal.sslCerts.listPage.searchAndClickEdit(testSslCert.name);
      });

      /* jshint ignore:start */
      String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
      };
      /* jshint ignore:end */

      it('should contain correct data in a newly created SSL Cert JSON object',
        function () {
          expect(sslCert.public_ssl_cert)
            .toBe(testSslCert.publicSSLCert.toString().replaceAll(',', '\n'));
          expect(sslCert.private_ssl_key)
            .toBe(testSslCert.privateSSLKey.toString().replaceAll(',', '\n'));
          expect(sslCert.comment).toBe(testSslCert.comment);
          expect(sslCert.cert_type).toBe('private');
        });

      it('should display correct data in the SSL Cert UI elements',
        function () {
          Portal.sslCerts.editPage.form.getCertName().then(function (certName) {
            expect(certName).toBe(sslCert.cert_name);
          });
          Portal.sslCerts.editPage.form.getPublicSSLCert().then(function (publicCert) {
            expect(publicCert).toBe(sslCert.public_ssl_cert);
          });
          Portal.sslCerts.editPage.form.getPrivateSSLKey().then(function (privateKey) {
            expect(privateKey).toBe(sslCert.private_ssl_key);
          });
          Portal.sslCerts.editPage.form.getComment().then(function (comment) {
            expect(comment).toBe(sslCert.comment);
          });
        });

      it('should contain correct data in the SSL Cert object after update',
        function (done) {
          testSslCertUpdated.name += 'UPDATED';
          // make some difference, replace a letter in the last line of the key/cert.
          testSslCertUpdated
            .publicSSLCert[testSslCertUpdated
              .publicSSLCert.length - 2] = testSslCertUpdated
                .publicSSLCert[testSslCertUpdated
                  .publicSSLCert.length - 2].replace('F', 'c');

          testSslCertUpdated
            .privateSSLKey[testSslCertUpdated
              .privateSSLKey.length - 2] = testSslCertUpdated
                .privateSSLKey[testSslCertUpdated
                  .privateSSLKey.length - 2].replace('F', 'c');

          Portal.sslCerts.editPage.form.fill(testSslCertUpdated);
          Portal.sslCerts.editPage.clickUpdate();
          Portal.dialog.clickOk();
          Portal.alerts.waitToDisplay().then(function () {
            Portal.sslCertHelpers.getSSLCert(testSslCertUpdated.name).then(function (cert) {
              sslCert = cert;
              expect(sslCert.public_ssl_cert)
                .toBe(testSslCertUpdated.publicSSLCert.toString().replaceAll(',', '\n'));
              expect(sslCert.private_ssl_key)
                .toBe(testSslCertUpdated.privateSSLKey.toString().replaceAll(',', '\n'));
              expect(sslCert.comment).toBe(testSslCertUpdated.comment);
              expect(sslCert.cert_type).toBe('private');
              done();
            });
          });
        });

      it('should display correct data in the SSL Cert UI elements after update',
        function () {
          Portal.sslCerts.editPage.form.getCertName().then(function (certName) {
            expect(certName).toBe(sslCert.cert_name);
          });
          Portal.sslCerts.editPage.form.getPublicSSLCert().then(function (publicCert) {
            expect(publicCert).toBe(sslCert.public_ssl_cert);
          });
          Portal.sslCerts.editPage.form.getPrivateSSLKey().then(function (privateKey) {
            expect(privateKey).toBe(sslCert.private_ssl_key);
          });
          Portal.sslCerts.editPage.form.getComment().then(function (comment) {
            expect(comment).toBe(sslCert.comment);
          });
        });
    });
  });
});
