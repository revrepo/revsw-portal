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
  var user = config.get('portal.users.admin');
  describe('Usage Report SSL Certs', function () {
    // disabling this, currently usage report generation doesnt update SSL Certs -- TODO FIX
    xdescribe('With user: ' + user.role, function () {
      var sslCertsCount = 0;
      var sslCert = DataProvider.generateSSLCertData();
      var deletedCerts = 0;
      beforeAll(function (done) {
        // get the amount of SSL certs we have
        Portal.signIn(user);
        Portal.helpers.nav.goToUsageReport();
        Portal.billing.usageReportPage.getDeletedSSLCerts().then(function (text) {
          deletedCerts = parseInt(text);
          API.helpers.authenticate(user).then(function () {
            API.resources.sslCerts
              .getAll()
              .expect(200)
              .then(function (res) {
                sslCertsCount = res.body.length;
                done();
              })
              .catch(done);
          });
        });
      });

      afterAll(function () {
        Portal.signOut();
      });

      it('should display correct amount of SSL Certs', function (done) {
        Portal.usageReportHelpers.generateReport().then(function () {
          Portal.helpers.nav.goToUsageReport().then(function () {
            Portal
              .usageReportHelpers
              .expectValue(sslCertsCount, Constants.USAGE_REPORT_IDS.ACTIVE_SSL_CERTS)
              .then(function () {
                expect(true).toBeTruthy();
                done();
              })
              .catch(function (err) {
                throw new Error(err);
              });
          });
        });
      });

      it('should display correct amount of ' +
        ' SSL Certs after adding a new certificate', function (done) {
          Portal.helpers.nav.goToSSLCertificates();
          Portal.sslCerts.listPage.clickAddNewSSLCert();
          Portal.sslCerts.addPage.createSSLCert(sslCert).then(function () {
            Portal.usageReportHelpers.generateReport().then(function () {
              Portal.helpers.nav.goToUsageReport().then(function () {
                Portal
                  .usageReportHelpers
                  .expectValue(sslCertsCount + 1, Constants.USAGE_REPORT_IDS.ACTIVE_SSL_CERTS)
                  .then(function () {
                    expect(true).toBeTruthy();
                    done();
                  })
                  .catch(function (err) {
                    throw new Error(err);
                  });
              });
            });
          });
        });

      it('should display correct amount of ' +
        ' SSL Certs after deleting a certificate', function (done) {
          Portal.helpers.nav.goToSSLCertificates();
          Portal.sslCerts.listPage.searchAndClickDelete(sslCert.name);
          Portal.dialog.clickOk().then(function () {
            Portal.usageReportHelpers.generateReport().then(function () {
              Portal.helpers.nav.goToUsageReport().then(function () {
                Portal
                  .usageReportHelpers
                  .expectValue(sslCertsCount, Constants.USAGE_REPORT_IDS.ACTIVE_SSL_CERTS)
                  .then(function () {
                    expect(true).toBeTruthy();
                    done();
                  })
                  .catch(function (err) {
                    throw new Error(err);
                  });
              });
            });
          });
        });

      it('should display correct amount of ' +
        ' deleted SSL Certs', function (done) {
          Portal.usageReportHelpers.generateReport().then(function () {
            Portal.helpers.nav.goToUsageReport().then(function () {
              Portal
                .usageReportHelpers
                .expectValue(deletedCerts + 1, Constants.USAGE_REPORT_IDS.DELETED_SSL_CERTS)
                .then(function () {
                  expect(true).toBeTruthy();
                  done();
                })
                .catch(function (err) {
                  throw new Error(err);
                });
            });
          });
        });
    });
  });
});
