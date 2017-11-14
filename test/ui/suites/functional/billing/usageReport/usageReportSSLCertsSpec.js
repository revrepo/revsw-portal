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

describe('Functional', function () {
  var user = config.get('portal.users.admin');
  describe('Usage Report SSL Certs', function () {
    describe('With user: ' + user.role, function () {
      var sslCertsCount = 0;
      var certsPerPage = 25;
      beforeAll(function (done) {
        // get the amount of SSL certs we have
        var lastPageCerts = 0;
        var pages = 0;
        Portal.signIn(user);
        Portal.helpers.nav.goToSSLCertificates();
        Portal.sslCerts.listPage.pager.getLastBtn().click();
        Portal.sslCerts.listPage.table.getRows().count().then(function (count) {
          lastPageCerts = count;
          Portal.sslCerts.listPage.pager.getCurrentPageIndex().then(function (text) {
            sslCertsCount = (certsPerPage * (text - 1)) + lastPageCerts;
            done();
          });
        });
      });

      afterAll(function () {
        Portal.signOut();
      });

      it('should display correct amount of SSL Certs', function () {
        Portal.helpers.nav.goToUsageReport();
        Portal.billing.usageReportPage.getSSLCertsForm().then(function (text) {
          expect(text).toContain(sslCertsCount);
        });
      });
    });
  });
});